<template>
    <div :class="open ? 'fixed w-full h-100 inset-0 z-50 overflow-hidden flex justify-center items-center' : 'hidden'" style="background: rgba(0,0,0,.7);">
		<div class="border-none shadow-lg bg-white dark:bg-zinc-900 w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
			<div class="py-4 text-left px-6">
                <div class="flex justify-between items-center">
					<p class="text-2xl font-bold">{{ name === "subscription" ? $t("Subscriptions") : name === "request" ? $t("Subscription requests") : $t("Followers") }}</p>
					<div class="cursor-pointer z-50" @click="closeModal()">
						<svg class="fill-current text-black dark:text-white" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
							<path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
						</svg>
					</div>
				</div>
				<div class="py-6 h-72 space-y-4">
                    <div v-if="!list" class="flex justify-center items-center h-full">
                        <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span class="sr-only">Loading...</span>
                    </div>
                    <div v-else-if="list.length === 0" class="flex flex-col justify-center items-center h-full">
                        <img src="/no_data.svg" width="200" class="my-9" />
                        <p class="font-semibold">{{ $t("There's nothing here!") }}</p>
                    </div>
                    <div v-else class="flex items-center justify-between" v-for="user in list">
                        <NuxtLink :to="'/'+user.vanity" class="flex">
                            <img :src='user.avatar ? runtimeConfig.CDN_URL+"/t_profile/"+user.avatar+".webp"  : "/avatar/"+(user.username.match("[A-z]") ? user.username.match("[A-z]")[0].toUpperCase() : "A")+".webp"' alt="" class="rounded-full w-11 h-11" />
                            <div class="flex-col pl-1.5">
                                <p class="font-semibold">{{ user.vanity }}</p>
                                <p class="text-gray-500 text-sm">{{ user.vanity }}</p>
                            </div>
                        </NuxtLink>

                        <div v-if="name === 'request'" class="space-x-2">
                            <button @click="requestResponse('accept', user.vanity)" class="w-46 text-white bg-blue-600 dark:bg-blue-700 p-1.5 text-xs rounded-md font-semibold">{{ $t("Accept") }}</button>
                            <button @click="requestResponse('decline', user.vanity)" class="w-46 bg-gray-200 dark:bg-gray-400 p-1.5 text-dark text-xs rounded-md font-semibold">{{ $t("Decline") }}</button>
                        </div>
                    </div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
    export default {
        props: {
            name: {
                type: String,
                required: true
            },
            open: {
                type: Boolean,
                required: false
            },
        },

        data() {
            return {
                list: null,
                runtimeConfig: useRuntimeConfig().public
            }
        },

        methods: {
            closeModal() {
                this.$emit("close");
            },

            getUser(vanity) {
                return fetch(`${this.runtimeConfig?.ACCOUNT_API_URL || "https://oauth.gravitalia.com"}/users/${vanity}`)
                    .then(res => res.json());
            },

            requestResponse(type, user) {
                fetch(`${this.runtimeConfig?.API_URL || "https://api.gravitalia.com"}/request/${type}?target=${user}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": useCookie("token").value
                    }
                })
                .then(_ => {
                    this.list.splice(this.list.findIndex(u => u.vanity === user), 1);
                });
            }
        },

        watch: {
            open(isOpened, _) {
                if(!isOpened || Array.isArray(this.list)) return;

                fetch(`${this.runtimeConfig?.API_URL || "https://api.gravitalia.com"}/list/${this.name}`, {
                    headers: {
                        "Authorization": useCookie("token").value
                    }
                })
                .then(res => res.json())
                .then(async (res) => {
                    this.list = [];

                    for(const vanity of res) {
                        this.list.push(await this.getUser(vanity))
                    }
                });
            }
        },
    }
</script>