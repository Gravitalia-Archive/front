<template>
    <Navbar @userData="callback" />
    <div class="flex flex-col md:flex-row justify-center space-y-12 md:space-y-0 md:space-x-24 px-2">
        <div class="w-full md:w-1/3 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-zinc-800 dark:border-zinc-700">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ $t("Account") }}</h5>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{ $t("Update account information, such as plan, private account and much more!") }}</p>

            <div class="flex items-center pt-4">
                <div class="flex">
                    <input v-model="public" aria-describedby="is your account public" type="checkbox" class="w-4 h-4" v-bind:checked="user ? user.public : true">
                </div>
                <div class="ml-2 text-sm">
                    <label for="public" class="font-medium text-gray-900 dark:text-gray-300">{{ $t("Public account") }}</label>
                    <p class="text-xs font-normal text-gray-500 dark:text-gray-400">{{ $t("Check if non-subscribers can access your photos") }}</p>
                </div>

                <div id="loading" role="status" class="hidden pl-4 pt-2">
                    <svg aria-hidden="true" class="w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
                    <span class="sr-only">{{ $t("Loading") }}...</span>
                </div>
            </div>
        </div>

        <div class="w-full md:w-1/3 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-zinc-800 dark:border-zinc-700">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ $t("Data") }}</h5>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{ $t("Get your data, or delete your account.") }}</p>

            <button @click="downloadData()" class="mt-4 text-sm w-full py-2 bg-violet-100 dark:bg-violet-400 dark:border-none outline-none border border-violet-100 rounded text-violet-500 dark:text-white font-medium hover:bg-violet-400 dark:hover:bg-violet-500 hover:text-white transition-colors duration-200">
                {{ $t("Download my data") }}
            </button>

            <span class="text-xs">{{ $t("Your data can only be downloaded every 48 hours.") }}</span>

            <button @click="showModal()" class="mt-4 text-sm w-full py-2 bg-red-50 dark:bg-red-400 dark:border-none outline-none border border-red-100 rounded text-red-500 dark:text-white font-medium hover:bg-red-400 dark:hover:bg-red-500 hover:text-white transition-colors duration-200">
                {{ $t("Delete account") }}
            </button>
        </div>
    </div>

    <div id="delete_modal" class="hidden fixed w-full h-100 inset-0 z-50 overflow-hidden flex justify-center items-center" style="background: rgba(0,0,0,.7);">
		<div class="border-none shadow-lg bg-white dark:bg-zinc-900 w-11/12 md:max-w-lg mx-auto rounded shadow-lg z-50 overflow-y-auto">
			<div class="py-4 text-left px-6">
                <div class="flex justify-between items-center">
					<p class="text-2xl font-bold">{{ $t("Do not left us! 😔") }}</p>
					<div class="cursor-pointer z-50" @click="closeModal()">
						<svg class="fill-current text-black dark:text-white" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
							<path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
						</svg>
					</div>
				</div>
                <br />
				<div>
                    <p>{{ $t("Deleting your account is IMMEDIATE and irreversible. This action will delete your posts, friends, subscribers, likes and more.") }}</p>
                    <br />
                    <p class="text-sm text-gray-600">{{ $t("This action may be useful if you want to start again your account from scratch!") }}</p>
				</div>
				<div class="flex justify-end pt-2 space-x-4">
                    <button @click="deleteAccount()" class="px-4 bg-red-50 dark:bg-opacity-0 dark:border-none outline-none border border-red-100 rounded text-red-500 dark:text-white font-medium hover:bg-red-400 dark:hover:bg-red-500 hover:text-white transition-colors duration-200">{{ $t("Supprimer") }}</button>
					<button @click="closeModal()" class="focus:outline-none px-4 bg-none duration-300 p-3 rounded text-black hover:bg-gray-200 dark:text-white hover:dark:text-gray-200 hover:dark:bg-gray-800">{{ $t("Cancel") }}</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
    export default {
        data() {
            return {
                user: null,
                runtimeConfig: useRuntimeConfig().public,
                public: null
            }
        },

        async mounted() {
            const token = useCookie("token");
            if(token.value) {
                this.user = await fetch(`${this.runtimeConfig?.API_URL || "https://api.gravitalia.com"}/users/@me`, {
                    headers: {
                        "Authorization": token.value
                    }
                })
                .then(res => res.json());
                this.public = this.user.public;
            }

            if(!this.user) return await navigateTo(`${this.runtimeConfig?.API_URL || "https://api.gravitalia.com"}/callback`, { external: true });
        },

        watch: {
            public(newBool, oldBool) {
                if(oldBool === null) return;

                document.getElementById("loading").classList.remove("hidden");

                fetch(`${this.runtimeConfig?.API_URL || "https://api.gravitalia.com"}/users/@me`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": useCookie("token").value
                    },
                    body: JSON.stringify({
                        public: newBool
                    })
                }).then(res => res.json())
                .then(_ => {
                    document.getElementById("loading").classList.add("hidden");
                });
            }
        },

        methods: {
            async callback(data) {
                if(!data) return await navigateTo(`${this.runtimeConfig?.API_URL || "https://api.gravitalia.com"}/callback`, { external: true });
            },

            showModal() {
                document.getElementById("delete_modal").classList.remove("hidden");
            },

            closeModal() {
                document.getElementById("delete_modal").classList.add("hidden");
            },

            deleteAccount() {
                fetch(`${this.runtimeConfig?.API_URL || "https://api.gravitalia.com"}/account/deletion`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": useCookie("token").value
                    }
                }).then(res => res.json())
                .then(res => {
                    if(!res.error) {
                        document.cookie = "token=gv;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                        return window.location.href = "/";
                    }
                });
            },

            downloadData() {
                fetch("https://api.gravitalia.com/account/data", {
                    method: "GET",
                    headers: {
                        "Authorization": useCookie("token").value
                    }
                })
                .then(response => response.blob())
                .then(blob => {
                    const url = URL.createObjectURL(blob);
                    
                    const link = document.createElement("a");
                    link.href = url;
                    link.download = "data.zip";
                    link.click();

                    URL.revokeObjectURL(url);
                });
            }
        }
    }
</script>