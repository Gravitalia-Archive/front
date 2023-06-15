<template>
    <Navbar @userData="callback" />
    <div>
        <div class="flex justify-center">
        <div class="flex h-fit gap-10 px-2 md:w-[22%]">
            <img class="rounded-full w-32 h-32" :src="user?.avatar && exists ? runtimeConfig?.CDN_URL+'/t_avatar/'+user.avatar+'.webp' : `/avatar/${exists ? user?.username[0]?.toUpperCase()||'U' : 'U'}.webp`" draggable="false" alt="" />

            <div class="grid gap-3 w-full">
                <div>
                    <div class="flex">
                        <h1 class="text-xl font-light">{{ exists ? user?.username || "Unknown account" : "Unknown account" }}</h1>
                        <span class="pl-4"></span><button v-if="user && user?.vanity !== vanity && exists" id="subscribe" @click="relation('subscribe')" class="w-46 text-white bg-blue-500 dark:bg-blue-600 p-1.5 text-xs rounded-md font-semibold">{{ $t("Subscribe") }}</button>
                        <button v-else-if="user && exists" class="w-46 bg-gray-200 dark:bg-gray-400 p-1.5 text-dark text-xs rounded-md font-semibold">{{ $t("Parameters") }}</button>
                        <div v-if="user && me && vanity !== user?.vanity && exists" class="flex">
                            <button type="button" aria-label="Action menu" class="z-50 pl-4" @click="showMenu()">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7 cursor-pointer">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                </svg>
                            </button>
                            <div class="pt-8 pl-14 absolute">
                                <div id="show-menu" class="hidden z-10 origin-top-right absolute right-0 mt-2 w-52 rounded-md shadow-lg py-1 bg-slate-100 dark:bg-zinc-800 dark:border dark:border-zinc-700 ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical">
                                    <svg class="absolute bottom-full right-4" width="22" height="13" viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg">
                                        <polygon class="fill-slate-100 dark:fill-zinc-800 dark:stroke-zinc-700" points="15, 0 30, 20 0, 20"/>
                                    </svg>
                                    <!-- <div class="w-full cursor-pointer"><span class="block px-4 py-2 text-sm font-semibold text-red-600 dark:text-white">{{ $t("Global block") }}</span></div> -->
                                    <div class="w-full cursor-pointer" @click="relation('block')"><span id="block" class="block px-4 py-2 text-sm font-semibold text-red-600 dark:text-white">{{ $t("Platform block") }}</span></div>
                                    <div class="w-full cursor-pointer" @click="showModal()"><span class="block px-4 py-2 text-sm text-gray-700 dark:text-white">{{ $t("Report") }}</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="ul flex w-full justify-between">
                    <p><b>{{ gv_user?.posts?.length||0 }}</b> {{ gv_user?.posts?.length||0 > 1 ? $t("photos") : $t("photo") }}</p>
                    <p><b>{{ gv_user?.followers||0 }}</b> {{ gv_user?.followers||0 > 1 ? $t("followers") : $t("follower") }}</p>
                    <p><b>{{ gv_user?.following||0 }}</b> {{ gv_user?.following||0 > 1 ? $t("subscriptions") : $t("subscription") }}</p>
                    </div>
                </div>
                <p><b class="pb-6">{{ exists ? user?.vanity : ""  }}</b><br />{{ exists ? user?.bio : "" }}</p>
            </div>
        </div>
            </div>
            <hr class="my-8 h-px w-1/2 bg-gray-200 dark:bg-gray-700 border-0  mx-auto">
            <div class="pt-4 flex justify-center">
                <div class="w-1/2 grid grid-cols-3 space-x-7">
                    <div v-for="post in gv_user?.posts||[]">
                        <a :href="'/'+user?.vanity+'/'+post.id" class="flex justify-start -space-x-[21.5rem]">
                            <img class="w-[21.5rem] h-[21.5rem] aspect-square" :onmouseenter="'document.getElementById('+post.id+').classList.remove(\'hidden\')'" :onmouseleave="'document.getElementById('+post.id+').classList.add(\'hidden\')'" draggable="false" :alt="post.text" src="/test.webp" />
                            <div :id="post.id" class="hidden bg-zinc-700/60 w-[21.5rem] h-[21.5rem] aspect-square inset-0 flex justify-center items-center text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                                </svg>
                                <p class="pl-2 text-white z-40 mix-blend-normal">{{ post.like }}</p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <div v-if="(gv_user?.posts||[]).length === 0">
            <div class="flex flex-col items-center justify-center">
                <div v-if="user?.vanity === vanity && exists">
                    <img alt="" src="/post.svg" width="200" height="200" />
                    <p class="pt-8 text-xl font-medium">{{ $t("On your marks, get set, shoot!") }}</p>
                    <a href="/upload"><p class="text-sm text-blue-600 hover:text-blue-800">{{ $t("Share your first adventure here") }}</p></a>
                </div>
                <div v-else-if="!user?.username || !exists">
                    <img alt="" src="/alien.svg" width="200" height="200" />
                    <p class="pt-8 text-xl font-medium">{{ $t("The aliens have taken him away!") }}</p>
                </div>
                <div v-else>
                    <img alt="" src="/post.svg" width="200" height="200" />
                    <p class="pt-8 text-xl font-medium">{{ $t("No publication for the moment") }}</p>
                </div>
            </div>
        </div>
    </div>

    <SignalChoice />
</template>

<script setup>
const { data: user } = await useFetch(`${useRuntimeConfig().public?.ACCOUNT_API_URL || "https://oauth.gravitalia.com"}/users/${useRoute().params.id}`, {
    headers: {
        "Authorization": useCookie("token").value
    }
});

if(user._value?.username) {
    useHeadSafe({
        meta: [
            {
                name: "description",
                content: `Access to the ${user._value.username}'s photos and much more!`
            },
            {
                property: "og:description",
                content: `Access to the ${user._value.username}'s photos and much more!`
            }
        ],
        title: `${user._value.username} (@${user._value.vanity}) / Gravitalia`
    });
} else {
    useHeadSafe({
        meta: [
            {
                name: "description",
                content: `Discover more accounts, new photos and more!`
            },
            {
                property: "og:description",
                content: `Discover more accounts, new photos and more!`
            }
        ]
    });
}
</script>

<script>
    export default {
        data() {
            return {
                exists: true,
                vanity: "",
                me: null,
                gv_user: null,
                runtimeConfig: useRuntimeConfig().public
            }
        },

        mounted() {
            fetch(`https://api.gravitalia.com/users/${useRoute().params.id}`, {
                headers: {
                    "Authorization": useCookie("token").value
                }
            })
            .then(res => res.json())
            .then(res => {
                if(res?.message === "Invalid user") {
                    this.exists = false;
                } else {
                    this.gv_user = res;
                }
            });
        },

        methods: {
            showMenu() {
                if(document.getElementById('show-menu').classList.value.includes('hidden')) {
                    document.getElementById('show-menu').classList.remove('hidden');
                } else {
                    document.getElementById('show-menu').classList.add('hidden');
                }
            },

            showModal() {
                document.getElementById("choice_signal").classList.remove("hidden");
            },

            callback(data) {
                this.me = data;
                this.vanity = data?._value?.vanity || "";
            },

            async relation(type) {
                if(!useCookie("token").value) return await navigateTo(`${this.runtimeConfig?.API_URL || "https://api.gravitalia.com"}/callback`, { external: true });

                fetch(`${this.runtimeConfig?.API_URL || "https://api.gravitalia.com"}/relation/${type}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": useCookie("token").value
                    },
                    body: JSON.stringify({
                        id: useRoute().params.id
                    })
                })
                .then(res => res.json())
                .then(res => {
                    if(res.message === "Created relation") {
                        if(type === "block") {
                            document.getElementById(type).innerText = this.$t("Platform unblock");
                        } else {
                            document.getElementById(type).classList.add("bg-gray-200", "dark:bg-gray-400", "text-dark");
                            document.getElementById(type).classList.remove("bg-blue-500", "dark:bg-blue-600", "text-white");
                            document.getElementById(type).innerText = this.$t("Unsubscribe");
                        }
                    } else {
                        if(type === "block") {
                            document.getElementById(type).innerText = this.$t("Platform block");
                        } else {
                            document.getElementById(type).classList.remove("bg-gray-200", "dark:bg-gray-400", "text-dark");
                            document.getElementById(type).classList.add("bg-blue-500", "dark:bg-blue-600", "text-white");
                            document.getElementById(type).innerText = this.$t("Subscribe");
                        }
                    }
                });
            }
        }
    }
</script>