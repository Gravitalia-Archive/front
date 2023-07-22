<template>
    <div class="bg-gray-200 dark:bg-zinc-800 mb-10">
        <div class="w-full text-gray-700 dark:text-white">
            <div class="flex flex-col max-w-screen-xl mx-auto md:items-center md:justify-between md:flex-row px-4 md:px-6 lg:px-8">
                <div class="flex flex-row items-center justify-between h-11">
                    <img alt="Gravitalia logo" width="30" height="30" src="/favicon.webp" draggable="false" />
                    <div class="hidden md:block"><span class="ml-8"></span></div>
                    <button aria-label="Open menu" @click="openMobile()" class="rounded-lg md:hidden focus:outline-none focus:shadow-outline">
                        <svg fill="currentColor" viewBox="0 0 20 20" class="w-6 h-6">
                            <path v-if="!isMobileMenuOpened" fillRule="evenodd" d="M1 2.75A.75.75 0 011.75 2h12.5a.75.75 0 110 1.5H1.75A.75.75 0 011 2.75zm0 5A.75.75 0 011.75 7h12.5a.75.75 0 110 1.5H1.75A.75.75 0 011 7.75zM1.75 12a.75.75 0 100 1.5h12.5a.75.75 0 100-1.5H1.75z" />
                            <path v-else class="hidden" fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
                <nav class="hidden md:block flex-col flex-grow pb-4 md:pb-0 md:flex md:flex-row">
                    <NuxtLink :class="path === '/' ? 'UnderlineNav-item UnderlineNav-item-selected' : 'UnderlineNav-item'" to="/" prefetch>{{ $t("Home") }}</NuxtLink>
                    <NuxtLink :class="path === '/explore' ? 'UnderlineNav-item UnderlineNav-item-selected' : 'UnderlineNav-item'" to="/explore" prefetch>{{ $t("Explore") }}</NuxtLink>

                    <SearchBar />
                </nav>
                <nav :class="isMobileMenuOpened ? 'md:hidden' : 'hidden'">
                    <span class="w-full flex justify-center text-center"><NuxtLink :class="path === '/' ? 'py-1 w-3/4 mb-2 bg-[#24292e] dark:bg-gray-700 text-white rounded' : 'py-1 w-3/4 bg-gray-300 dark:bg-gray-200 dark:text-black hover:bg-gray-400 rounded mb-2'" to="/" prefetch>{{ $t("Home") }}</NuxtLink></span>
                    <span class="w-full flex justify-center text-center"><NuxtLink :class="path === '/explore' ? 'py-1 w-3/4 mb-2 bg-[#24292e] dark:bg-gray-700 text-white rounded' : 'py-1 w-3/4 bg-gray-300 dark:bg-gray-200 dark:text-black hover:bg-gray-400 rounded mb-2'" to="/explore" prefetch>{{ $t("Explore") }}</NuxtLink></span>
                    <SearchBar />
                    <br />
                </nav>
                <div class="absolute pl-32 md:pl-0 md:static md:flex-left flex flex-row items-center justify-between h-11">
                    <!-- Notification -->
                    <div v-if="user" class="relative ml-3 pt-1">
                        <svg v-if="!isNotificationMenuOpened" @click="isNotificationMenuOpened = !isNotificationMenuOpened; lastReadNotification = 0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                        </svg>
                        <svg v-else @click="isNotificationMenuOpened = !isNotificationMenuOpened; lastReadNotification = 0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 cursor-pointer">
                            <path fill-rule="evenodd" d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z" clip-rule="evenodd" />
                        </svg>

                        <!-- Pulse notification -->
                        <span v-if="lastReadNotification !== 0" class="absolute h-3 w-3 rounded-full bg-purple-400 opacity-75">
                            <span class="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-purple-400 opacity-75"></span>
                        </span>

                        <div class="pl-10">
                            <div :class="isNotificationMenuOpened ? 'z-40 py-2 origin-top-right absolute right-0 mt-6 w-64 rounded-md shadow-lg bg-slate-100 dark:bg-zinc-800 dark:border dark:border-zinc-700' : 'hidden'">
                                <svg class="absolute bottom-full right-4" width="22" height="13" viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg">
                                    <polygon class="fill-slate-100 dark:fill-zinc-800 dark:stroke-zinc-700" points="15, 0 30, 20 0, 20"/>
                                </svg>

                                <button @click="openNotificationModal = !openNotificationModal" class="py-2 flex justify-center">
                                    <p class="text-sm font-semibold">{{ $t("View subscription requests") }}</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7 mt-1 mr-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                    </svg>
                                </button>

                                <hr class="h-px bg-gray-200 border-0 dark:bg-zinc-600" />
                                
                                <div v-if="notification.length === 0" class="flex justify-center py-2 pt-4">
                                    <p class="text-sm">{{ $t("No notification for the moment!") }}</p>
                                </div>
                                <div v-else class="max-h-64">
                                    <div v-for="notif in notification" class="px-4 py-2 pt-4 text-sm">
                                        <NuxtLink :to="notif.url">
                                            <strong>{{ notif.from }}</strong> {{ $t(notif.content) }}
                                        </NuxtLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-if="user">
                        <!-- User menu -->
                        <div class="relative ml-3 pt-2">
                            <button type="button" aria-label="User menu" class="flex rounded-full text-sm focus:outline-none" @click="showProfile()">
                                <img class="w-8 h-8 rounded-full" :src='user.avatar ? runtimeConfig.CDN_URL+"/t_profile/"+user.avatar+".webp"  : "/avatar/"+(user.username.match("[A-z]") ? user.username.match("[A-z]")[0].toUpperCase() : "A")+".webp"' alt="">
                            </button>
                            <div class="pt-1.5 pl-10">
                                <div :class="isProfileShown ? 'z-50 origin-top-right absolute right-0 mt-3 w-48 rounded-md shadow-lg py-1 bg-slate-100 dark:bg-zinc-800 dark:border dark:border-zinc-700 ring-1 ring-black ring-opacity-5 focus:outline-none' : 'hidden'" role="menu" aria-orientation="vertical">
                                    <svg class="absolute bottom-full right-4" width="22" height="13" viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg">
                                        <polygon class="fill-slate-100 dark:fill-zinc-800 dark:stroke-zinc-700" points="15, 0 30, 20 0, 20"/>
                                    </svg>
                                    <p class="block px-4 py-2 text-sm text-gray-800 dark:text-gray-100">{{ $t("Signed in as") }}<br /><strong>{{ user.username }}</strong></p>
                                    <hr class="h-px bg-gray-200 border-0 dark:bg-zinc-600" />
                                    <NuxtLink :to="'/'+user.vanity" prefetch class="block px-4 py-2 text-sm text-gray-700 dark:text-white">{{ $t("Profile") }}</NuxtLink>
                                    <NuxtLink to="/parameters" prefetch class="block px-4 py-2 text-sm text-gray-700 dark:text-white">{{ $t("Parameters") }}</NuxtLink>
                                    <NuxtLink to="/upload" prefetch class="block px-4 py-2 text-sm text-gray-700 dark:text-white">{{ $t("New post") }}</NuxtLink>
                                    <span class="block px-4 py-2 text-sm text-gray-700 dark:text-white cursor-pointer"><span @click="logout()">{{ $t("Logout") }}</span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <a v-else :href="(runtimeConfig?.API_URL || 'https://api.gravitalia.com')+'/callback'" class="cursor-pointer py-1.5 px-4 font-semibold rounded-lg shadow-md text-white bg-[#332b43] dark:bg-indigo-600">{{ $t("Sign in") }}</a>
                </div>
            </div>
        </div>
    </div>

    <List @close="openNotificationModal = false" name="request" :open="openNotificationModal" />
</template>

<script setup>
import { ref, onMounted } from "vue";

const runtimeConfig = useRuntimeConfig().public;
const token = useCookie("token");
const { data: user } = token.value ? await useFetch(`${runtimeConfig?.ACCOUNT_API_URL || "https://oauth.gravitalia.com"}/users/@me`, {
    headers: {
        "Authorization": token.value
    }
}) : {data: null};

const path = useRoute().path;

const emit = defineEmits(["userData"]);
emit("userData", user);

const notification = ref([]);
const lastReadNotification = ref(0);
onMounted(() => {
    if(user?._value?.username) {
        let lastMessage = "";
        const eventSource = new EventSource("https://notification.gravitalia.com/sse", {
            withCredentials: true
        });

        eventSource.onmessage = function(e) {
            const event = JSON.parse(e.data);

            if(event.type === "PING" || `${event.from}${event.type}${event?.to||""}` === lastMessage) return;
                
            let content;
            switch (event.type) {
                case "request_subscription":
                    content = "requested to follow you";
                    break;

                case "subscription_accepted":
                    content = "has accepted your subscription request";
                    break;

                case "post_like":
                    content = "liked your publication";
                    break;

                case "post_comment":
                    content = "commented on your publication";
                    break;

                case "post_mention":
                    content = "mentioned you";
                    break;
            }


            notification.value.push({
                url: event.type?.includes("post_") ? `/p/${event.to}` : `/${event.from}`,
                from: event.from,
                content
            });

            lastReadNotification.value++;
            lastMessage = `${event.from}${event.type}${event?.to||""}`;
        };

        eventSource.onerror = function(_) {
            return;
        };
    }
});

function logout() {
    document.cookie = "token=gv;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    window.location.reload();
}
</script>

<script>
    export default {
        data() {
            return {
                isProfileShown: false,
                isMobileMenuOpened: false,
                isNotificationMenuOpened: false,
                openNotificationModal: false
            }
        },

        methods: {
            showProfile() {
                this.isProfileShown = !this.isProfileShown;
            },

            openMobile() {
                this.isMobileMenuOpened = !this.isMobileMenuOpened;
            }
        }
    }
</script>

<style>
    .UnderlineNav-item {
        padding: 8px 16px;
        font-size: 14px;
        line-height: 30px;
        color: var(#24292e);
        text-align: center;
        white-space: nowrap;
        background-color: transparent;
        border: 0;
        border-bottom: 2px solid transparent;
        cursor: pointer;
    }
    .UnderlineNav-item:hover,
    .UnderlineNav-item:focus {
        color: var(#24292e);
        text-decoration: none;
        border-bottom-color: var(#d1d5da);
        outline: 1px dotted transparent;
        outline-offset: -1px;
        transition: border-bottom-color 0.12s ease-out;
    }
    .UnderlineNav-item.selected,
    .UnderlineNav-item[role="tab"][aria-selected="true"],
    .UnderlineNav-item-selected {
        font-weight: 600;
        color: var(#24292e);
        border-bottom-color: #332b43;
        outline: 1px dotted transparent;
        outline-offset: -1px;
    }

    input[type="search"]::-webkit-search-decoration,
    input[type="search"]::-webkit-search-cancel-button,
    input[type="search"]::-webkit-search-results-button,
    input[type="search"]::-webkit-search-results-decoration { display: none; }
</style>
