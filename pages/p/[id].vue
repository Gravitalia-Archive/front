<template>
    <Navbar @userData="callback" />
    <div>
        <div class="flex h-[73vh] md:h-[75vh] xl:h-[80vh]">
            <div class="relative m-auto">
                <div class="flex flex-col lg:flex-row h-max w-full rounded-r border">
                    <img
                        id="1"
                        :src="post?.hash ? runtimeConfig?.CDN_URL+'/t_post/'+post.hash[0]+'.webp' : ''"
                        class="max-h-[32rem]"
                        alt=""
                        crossorigin="anonymous"
                        loading="eager"
                        decoding="sync"
                        fetchpriority="high"
                        referrerpolicy="no-referrer"
                        draggable="false"
                        :alt="post?.text"
                    />

                    <div class="px-4 pt-2">
                        <div class="flex py-2">
                            <img :src='user?.avatar ? runtimeConfig.CDN_URL+"/t_profile/"+user.avatar+".webp" : "/avatar/"+(user?.username.match("[A-z]") ? user.username.match("[A-z]")[0].toUpperCase() : "A")+".webp"' class="rounded-full h-8 w-8" alt="" />
                            <NuxtLink :to="'/'+user?.vanity" prefetch class="pt-1 pl-2 font-semibold text-sm">{{ user?.vanity || "" }}</NuxtLink>
                            <p class="text-sm text-gray-500 pt-1 pl-1.5">• {{ post?.id ? timestampToDate(snowflakeToTimestamp(post.id)) : $t("now") }}</p>

                            <button type="button" aria-label="Action menu" class="z-20 pl-16 lg:pl-40" @click="showMenu()">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                </svg>
                            </button>

                            <div id="show-menu" class="hidden pt-8 pl-16 lg:pl-80 absolute">
                                <div class="z-10 origin-top-right absolute right-0 mt-2 w-52 rounded-md shadow-lg py-1 bg-slate-100 dark:bg-zinc-800 dark:border dark:border-zinc-700 ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical">
                                    <svg class="absolute bottom-full right-4" width="22" height="13" viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg">
                                        <polygon class="fill-slate-100 dark:fill-zinc-800 dark:stroke-zinc-700" points="15, 0 30, 20 0, 20"/>
                                    </svg>
                                    <!-- <div class="w-full cursor-pointer" @click="navigator.clipboard.writeText(window.location.href),showMenu()"><span class="block px-4 py-2 text-sm text-gray-700 dark:text-white">{{ $t("Share") }}</span></div> -->
                                    <div class="w-full cursor-pointer" @click="showModal()"><span class="block px-4 py-2 text-sm font-semibold text-red-600 dark:text-white">{{ $t("Report") }}</span></div>
                                </div>
                            </div>
                        </div>

                        <hr />

                        <div v-if="post?.text" class="pt-4 flex">
                            <NuxtLink :to="'/'+user?.vanity" prefetch>
                                <img :src='user?.avatar ? runtimeConfig.CDN_URL+"/t_profile/"+user.avatar+".webp" : "/avatar/"+(user?.username.match("[A-z]") ? user.username.match("[A-z]")[0].toUpperCase() : "A")+".webp"' class="rounded-full h-10 w-10" alt="" draggable="false" />
                            </NuxtLink>

                            <div class="flex-col">
                                <NuxtLink :to="'/'+user?.vanity" prefetch class="pt-1 pl-2 font-semibold text-sm">{{ user?.vanity || "" }}</NuxtLink>
                                <p class="pl-2 w-full text-sm text-gray-600 dark:text-white">{{ post?.text }}</p>
                            </div>
                        </div>

                        <div v-if="post?.comments.length === 0 || post?.comments[0].id === null" class="pt-28 flex flex-col justify-center items-center">
                            <img src="/comment.svg" alt="" width="300" fetchpriority="low" />
                            <p class="font-semibold pt-6">{{ $t("Be the first to comment!") }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <Footer absolute="true" />
    <SignalChoice :id="useRoute().params.id" />
</template>

<script setup>
useHeadSafe({
    meta: [
        {
            name: "description",
            content: "Discover more accounts, new photos and more!"
        },
        {
            property: "og:description",
            content: "Discover more accounts, new photos and more!"
        }
    ],
    link: [
        { rel: "canonical", href: `${useRuntimeConfig().public?.SITE_URL || "https://www.gravitalia.com"}/${useRoute().params.id}` }
    ]
});
</script>

<script>
    export default {
        data() {
            return {
                me: null,
                user: null,
                post: null,
                runtimeConfig: useRuntimeConfig().public
            }
        },

        async mounted() {
            this.post = await (useCookie("token")?.value ? fetch(`${this.runtimeConfig?.API_URL || "https://api.gravitalia.com"}/posts/${useRoute().params.id}`, {
                headers: {
                    "Authorization": useCookie("token")?.value||null
                }
            }) : fetch(`${this.runtimeConfig?.API_URL || "https://api.gravitalia.com"}/posts/${useRoute().params.id}`, {}))
            .then(res => res.json());

            this.user = await fetch(`${this.runtimeConfig?.ACCOUNT_API_URL || "https://oauth.gravitalia.com"}/users/${this.post?.author}`)
                .then(res => res.json());
        },

        methods: {
            callback(data) {
                this.me = data;
            },

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

            snowflakeToTimestamp(snowflake) {
                const EPOCH_OFFSET = 1672600000000;

                return ((snowflake >> 22) + EPOCH_OFFSET);
            },

            timestampToDate(timestamp) {
                const date = new Date(timestamp);
                const day = date.getDate();
                const month = date.getMonth() + 1;

                return ((day < 10) ? '0' + day : day) + '/' + ((month < 10) ? '0' + month : month) + '/' + date.getFullYear();
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