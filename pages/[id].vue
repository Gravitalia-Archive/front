<template>
    <Navbar @userData="callback" />
    <div>
        <div class="flex justify-center">
            <div class="flex h-fit gap-4 xl:gap-6 px-2">
                <img class="rounded-full w-24 h-24 xl:w-32 xl:h-32" :src="user?.avatar && exists ? runtimeConfig?.CDN_URL+'/t_avatar/'+user.avatar+'.webp' : `/avatar/${exists ? user?.username[0]?.toUpperCase()||'U' : 'U'}.webp`" draggable="false" alt="" fetchpriority="high" />

                <div class="grid gap-2 w-full">
                    <div>
                        <div class="flex items-center">
                            <h1 class="text-xl font-light">
                                {{ exists ? user?.username || "Unknown account" : "Unknown account" }}
                            </h1>

                            <!-- Verified badge -->
                            <div v-if="user?.flags & 2">
                                <div :class="openTooltips.verified ? 'absolute -mt-8' : 'hidden'">
                                    <div class="bg-black text-white text-xs rounded py-1 px-4 right-0 bottom-full">
                                        {{ $t("Verified user") }}
                                        <svg class="absolute text-black h-2 left-0 ml-3 top-full" x="0px" y="0px" viewBox="0 0 255 255" xml:space="preserve"><polygon class="fill-current" points="0,0 127.5,127.5 255,0"/></svg>
                                    </div>
                                </div>

                                <span @mouseover="openTooltips.verified = true;" @mouseout="openTooltips.verified = false;" class="mx-1 w-5 h-5 bg-purple-200 dark:bg-purple-600 rounded-full flex justify-center items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3 h-3">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                </span>
                            </div>

                            <!-- Staff badge -->
                            <div v-if="user?.flags & 32">
                                <div :class="openTooltips.staff ? 'absolute -mt-8' : 'hidden'">
                                    <div class="bg-black text-white text-xs rounded py-1 px-4 right-0 bottom-full">
                                        {{ $t("Gravitalia staff") }}
                                        <svg class="absolute text-black h-2 left-0 ml-3 top-full" x="0px" y="0px" viewBox="0 0 255 255" xml:space="preserve"><polygon class="fill-current" points="0,0 127.5,127.5 255,0"/></svg>
                                    </div>
                                </div>

                                <span @mouseover="openTooltips.staff = true;" @mouseout="openTooltips.staff = false;" class="mx-1 w-5 h-5 bg-purple-200 dark:bg-purple-500 rounded-full flex justify-center items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-3 h-3">
                                        <path fill-rule="evenodd" d="M12 6.75a5.25 5.25 0 016.775-5.025.75.75 0 01.313 1.248l-3.32 3.319c.063.475.276.934.641 1.299.365.365.824.578 1.3.64l3.318-3.319a.75.75 0 011.248.313 5.25 5.25 0 01-5.472 6.756c-1.018-.086-1.87.1-2.309.634L7.344 21.3A3.298 3.298 0 112.7 16.657l8.684-7.151c.533-.44.72-1.291.634-2.309A5.342 5.342 0 0112 6.75zM4.117 19.125a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008z" clip-rule="evenodd" />
                                        <path d="M10.076 8.64l-2.201-2.2V4.874a.75.75 0 00-.364-.643l-3.75-2.25a.75.75 0 00-.916.113l-.75.75a.75.75 0 00-.113.916l2.25 3.75a.75.75 0 00.643.364h1.564l2.062 2.062 1.575-1.297z" />
                                        <path fill-rule="evenodd" d="M12.556 17.329l4.183 4.182a3.375 3.375 0 004.773-4.773l-3.306-3.305a6.803 6.803 0 01-1.53.043c-.394-.034-.682-.006-.867.042a.589.589 0 00-.167.063l-3.086 3.748zm3.414-1.36a.75.75 0 011.06 0l1.875 1.876a.75.75 0 11-1.06 1.06L15.97 17.03a.75.75 0 010-1.06z" clip-rule="evenodd" />
                                    </svg>
                                </span>
                            </div>

                            <!-- Bug hunter badge -->
                            <div v-if="user?.flags & 64">
                                <div :class="openTooltips.bug ? 'absolute -mt-8' : 'hidden'">
                                    <div class="bg-black text-white text-xs rounded py-1 px-4 right-0 bottom-full">
                                        {{ $t("Bug hunter") }}
                                        <svg class="absolute text-black h-2 left-0 ml-3 top-full" x="0px" y="0px" viewBox="0 0 255 255" xml:space="preserve"><polygon class="fill-current" points="0,0 127.5,127.5 255,0"/></svg>
                                    </div>
                                </div>

                                <span @mouseover="openTooltips.bug = true;" @mouseout="openTooltips.bug = false;" class="mx-1 w-5 h-5 bg-purple-200 dark:bg-purple-600 rounded-full flex justify-center items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-3 h-3">
                                        <path fill-rule="evenodd" d="M8.478 1.6a.75.75 0 01.273 1.025 3.72 3.72 0 00-.425 1.122c.058.057.118.114.18.168A4.491 4.491 0 0112 2.25c1.413 0 2.673.651 3.497 1.668.06-.054.12-.11.178-.167a3.717 3.717 0 00-.426-1.126.75.75 0 111.298-.75 5.22 5.22 0 01.671 2.045.75.75 0 01-.187.582c-.241.27-.505.52-.787.749a4.495 4.495 0 01.216 2.1c-.106.792-.753 1.295-1.417 1.403-.182.03-.364.057-.547.081.152.227.273.476.359.741a23.122 23.122 0 003.832-.802 23.241 23.241 0 00-.345-2.634.75.75 0 011.474-.28c.21 1.115.348 2.256.404 3.418a.75.75 0 01-.516.749c-1.527.5-3.119.855-4.76 1.05-.074.38-.22.735-.423 1.05a24.61 24.61 0 015.943 1.358.75.75 0 01.492.75 24.665 24.665 0 01-1.189 6.25.75.75 0 01-1.425-.47 23.141 23.141 0 001.077-5.307c-.5-.168-1.009-.32-1.524-.454.068.234.104.484.104.746 0 3.956-2.521 7.5-6 7.5-3.478 0-6-3.544-6-7.5 0-.262.037-.511.104-.746-.514.134-1.022.286-1.522.454a23.14 23.14 0 001.077 5.308.75.75 0 01-1.425.468 24.663 24.663 0 01-1.19-6.25.75.75 0 01.493-.749 24.593 24.593 0 014.964-1.24h.01c.321-.046.644-.085.969-.118a2.982 2.982 0 01-.424-1.05 24.614 24.614 0 01-4.76-1.05.75.75 0 01-.516-.75c.057-1.161.194-2.302.405-3.417a.75.75 0 011.474.28c-.164.862-.28 1.74-.345 2.634 1.237.37 2.517.641 3.832.802.085-.265.207-.514.359-.74a18.732 18.732 0 01-.547-.082c-.664-.108-1.311-.611-1.417-1.403a4.535 4.535 0 01.217-2.103 6.788 6.788 0 01-.788-.751.75.75 0 01-.187-.583 5.22 5.22 0 01.67-2.04.75.75 0 011.026-.273z" clip-rule="evenodd" />
                                    </svg>
                                </span>
                            </div>

                            <span class="pl-4"></span>
                            <button v-if="user && user?.vanity !== vanity && exists && requested_subscription" id="subscriber" @click="relation('subscriber')" class="w-46 bg-gray-200 dark:bg-gray-400 p-1.5 text-dark text-xs rounded-md font-semibold">{{ $t("Subscription requested") }}</button>
                            <button v-else-if="user && user?.vanity !== vanity && exists && !gv_user?.followed_by_viewer" id="subscriber" @click="relation('subscriber')" class="w-46 text-white bg-blue-600 dark:bg-blue-700 p-1.5 text-xs rounded-md font-semibold">{{ $t("Subscribe") }}</button>
                            <button v-else-if="user && user?.vanity !== vanity && exists && gv_user?.followed_by_viewer" id="subscriber" @click="relation('subscriber')" class="w-46 bg-gray-200 dark:bg-gray-400 p-1.5 text-dark text-xs rounded-md font-semibold">{{ $t("Unsubscribe") }}</button>
                            <NuxtLink prefetch to="/parameters" v-else-if="user && exists" class="cursor-pointer w-46 bg-gray-200 dark:bg-zinc-500 p-1.5 text-dark text-xs rounded-md font-semibold">{{ $t("Parameters") }}</NuxtLink>
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
                                        <!-- <div class="w-full cursor-pointer"><span class="block px-4 py-2 text-sm font-semibold text-red-600 dark:text-red-400">{{ $t("Global block") }}</span></div> -->
                                        <div class="w-full cursor-pointer" @click="relation('block')"><span id="block" class="block px-4 py-2 text-sm font-semibold text-red-600 dark:text-red-400">{{ blocked ? $t("Platform unblock") : $t("Platform block") }}</span></div>
                                        <div class="w-full cursor-pointer" @click="showModal()"><span class="block px-4 py-2 text-sm text-gray-700 dark:text-white">{{ $t("Report") }}</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex justify-between space-x-2">
                            <p class="text-sm"><b>{{ gv_user?.post_count || 0 }}</b> {{ gv_user?.post_count > 1 ? $t("photos") : $t("photo") }}</p>

                            <p v-if="me && me.vanity === user?.vanity" class="text-sm cursor-pointer" @click="openSubscriberModal = !openSubscriberModal"><b id="nb_followers">{{ gv_user?.followers || 0 }}</b> {{ gv_user?.followers > 1 ? $t("followers") : $t("follower") }}</p>
                            <p v-else class="text-sm"><b id="nb_followers">{{ gv_user?.followers || 0 }}</b> {{ gv_user?.followers > 1 ? $t("followers") : $t("follower") }}</p>

                            <p v-if="me && me.vanity === user?.vanity" class="text-sm cursor-pointer" @click="openSubscriptionModal = !openSubscriptionModal"><b>{{ gv_user?.following || 0 }}</b> {{ gv_user?.following > 1 ? $t("subscriptions") : $t("subscription") }}</p>
                            <p v-else class="text-sm"><b>{{ gv_user?.following || 0 }}</b> {{ gv_user?.following > 1 ? $t("subscriptions") : $t("subscription") }}</p>
                        </div>
                    </div>
                    <p><b class="pb-6">{{ exists ? user?.vanity : ""  }}</b><br /><span class="text-gray-700 text-sm">{{ exists ? user?.bio : "" }}</span></p>
                </div>
            </div>
        </div>

            <hr class="my-8 h-px w-3/4 xl:w-2/3 2xl:w-[51.9%] bg-gray-200 dark:bg-gray-700 border-0 mx-auto">
            <div class="flex justify-center">
                <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-3 px-5">
                    <div v-for="(post, index) in gv_user?.posts || []" class="pt-4 flex justify-end items-center">
                        <NuxtLink prefetch :to="'/p/'+post.id" :aria-label="'Click here to open image number ' + post.id" class="flex justify-start -space-x-80">
							<img
                                :onmouseenter="'document.getElementById(\''+post.id+'\').classList.remove(\'hidden\')'"
                                class="w-80 h-80"
                                :src="runtimeConfig?.CDN_URL+'/t_media_lib_thumb/'+post.hash[0]+'.webp'"
                                alt=""
                                crossorigin="anonymous"
                                :loading="index >= 6 ? 'lazy' : 'eager'"
                                decoding="async"
                                :fetchpriority="index >= 6 ? 'low' : 'high'"
                                referrerpolicy="no-referrer"
                            />

							<div :id="post.id" :onmouseleave="'document.getElementById(\''+post.id+'\').classList.add(\'hidden\')'" class="hidden w-80 h-80 bg-zinc-700/60 flex justify-center items-center text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                                </svg>
                                <p class="pl-2 font-bold text-white z-40">{{ post.like }}</p>
							</div>
                        </NuxtLink>
                    </div>
                </div>
            </div>

            <div v-if="(gv_user?.posts||[]).length === 0">
                <div class="flex flex-col items-center justify-center">
                    <div v-if="user?.vanity === vanity && exists">
                        <img alt="" src="/post.svg" width="200" height="200" />
                        <p class="pt-8 text-xl font-medium">{{ $t("On your marks, get set, shoot!") }}</p>
                        <NuxtLink prefetch to="/upload"><p class="text-sm text-blue-600 hover:text-blue-800">{{ $t("Share your first adventure here") }}</p></NuxtLink>
                    </div>
                    <div v-else-if="!user?.username || !exists">
                        <img alt="" src="/alien.svg" width="200" height="200" />
                        <p class="pt-8 text-xl font-medium">{{ $t("The aliens have taken him away!") }}</p>
                    </div>
                    <div v-else-if="!gv_user?.public && !gv_user?.followed_by_viewer">
                        <p class="pt-8 text-xl font-medium flex justify-center">{{ $t("This account is private") }}</p>
                        <p class="text-sm flex justify-center">{{ $t("Follow it to access its photos") }}</p>
                    </div>
                    <div v-else>
                        <img alt="" src="/post.svg" width="200" height="200" />
                        <p class="pt-8 text-xl font-medium">{{ $t("No publication for the moment") }}</p>
                    </div>
                </div>
            </div>
            <div v-else>
                <br /><br />
                <Footer :absolute="gv_user === null || gv_user.posts.length < 4" />
            </div>
    </div>
    
    <List @close="openSubscriptionModal = false" v-if="me && me.vanity === user?.vanity" name="subscription" :open="openSubscriptionModal" />
    <List @close="openSubscriberModal = false" v-if="me && me.vanity === user?.vanity" name="subscriber" :open="openSubscriberModal" />
    <SignalChoice />
</template>

<script setup>
const { data: user } = useCookie("token")?.value ? await useFetch(`${useRuntimeConfig().public?.ACCOUNT_API_URL || "https://oauth.gravitalia.com"}/users/${useRoute().params.id}`, {
    headers: {
        "Authorization": useCookie("token").value
    }
}) : await useFetch(`${useRuntimeConfig().public?.ACCOUNT_API_URL || "https://oauth.gravitalia.com"}/users/${useRoute().params.id}`, {});

if(user._value?.username) {
    useHead({
        htmlAttrs: {
            lang: useI18n().locale
        },
        meta: [
            {
                property: "og:title",
                content: `${user._value.username} (@${user._value.vanity}) / Gravitalia`
            },
            {
                name: "description",
                content: `Access to ${user._value.username}'s photos and much more!`
            },
            {
                property: "og:description",
                content: `Access to ${user._value.username}'s photos and much more!`
            }
        ],
        link: [
            { rel: "canonical", href: `${useRuntimeConfig().public?.SITE_URL || "https://www.gravitalia.com"}/${user._value.vanity}` }
        ],
        script: [
            {
                type: "application/ld+json",
                children: JSON.stringify({
                    "@context": "http://schema.org",
                    "@type": "Person",
                    "@id": `${useRuntimeConfig().public?.SITE_URL || "https://www.gravitalia.com"}/${user._value.vanity}`,
                    "name": user._value.username,
                    "url": `${useRuntimeConfig().public?.SITE_URL || "https://www.gravitalia.com"}/${user._value.vanity}`,
                    "image": user._value?.avatar ? useRuntimeConfig().public?.CDN_URL+'/t_avatar/'+user._value.avatar+'.webp' : `${useRuntimeConfig().public?.SITE_URL || "https://www.gravitalia.com"}/avatar/${user._value?.username[0]?.toUpperCase() || "U"}.webp`,
                    "description": user._value?.bio || ""
                })
            }
        ],
        title: `${user._value.username} (@${user._value.vanity}) / Gravitalia`
    });
} else {
    useHead({
        htmlAttrs: {
            lang: useI18n().locale
        },
        meta: [
            {
                name: "description",
                content: `Discover more accounts, new photos and more!`
            },
            {
                property: "og:description",
                content: `Discover more accounts, new photos and more!`
            }
        ],
        link: [
            { rel: "canonical", href: `${useRuntimeConfig().public?.SITE_URL || "https://www.gravitalia.com"}/${useRoute().params.id}` }
        ],
        title: "Gravitalia"
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
                runtimeConfig: useRuntimeConfig().public,
                blocked: false,
                requested_subscription: false,
                openSubscriptionModal: false,
                openSubscriberModal: false,
                openTooltips: {
                    verified: false,
                    staff: false,
                    bug: false
                }
            }
        },

        async mounted() {
            (useCookie("token")?.value ? fetch(`${this.runtimeConfig?.API_URL || "https://api.gravitalia.com"}/users/${useRoute().params.id}`, {
                headers: {
                    "Authorization": useCookie("token").value
                }
            }) : fetch(`${this.runtimeConfig?.API_URL || "https://api.gravitalia.com"}/users/${useRoute().params.id}`, {}))
            .then(res => res.json())
            .then(res => {
                if(res?.message === "Invalid user") {
                    this.exists = false;
                } else {
                    this.gv_user = res;
                }
            });
        },

        watch: {
            async vanity(newVanity, _) {
                const userId = useRoute().params.id;

                this.requested_subscription = useCookie("token").value && newVanity !== userId ? await fetch(`${this.runtimeConfig?.API_URL || "https://api.gravitalia.com"}/relation/request?target=${userId}`, {
                    headers: {
                        "Authorization": useCookie("token").value
                    }
                })
                .then(res => res.json())
                .then(res => res.message === "existent") : false;

                this.blocked = useCookie("token").value && newVanity !== userId ? await fetch(`${this.runtimeConfig?.API_URL || "https://api.gravitalia.com"}/relation/block?target=${userId}`, {
                    headers: {
                        "Authorization": useCookie("token").value
                    }
                })
                .then(res => res.json())
                .then(res => res.message === "existent") : false;
            }
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
                    if(res.message === "Request added") {
                        this.requested_subscription = true;
                    } else if(res.message === "Created relation") {
                        if(type === "block") {
                            document.getElementById(type).innerText = this.$t("Platform unblock");
                        } else {
                            document.getElementById(type).classList.add("bg-gray-200", "dark:bg-gray-400", "text-dark");
                            document.getElementById(type).classList.remove("bg-blue-500", "dark:bg-blue-600", "text-white");
                            document.getElementById(type).innerText = this.$t("Unsubscribe");
                            const nb_followers = document.getElementById("nb_followers");
                            nb_followers.innerText = parseInt(nb_followers.innerText, 10) + 1;
                        }
                    } else {
                        if(type === "block") {
                            document.getElementById(type).innerText = this.$t("Platform block");
                        } else {
                            document.getElementById(type).classList.remove("bg-gray-200", "dark:bg-gray-400", "text-dark");
                            document.getElementById(type).classList.add("bg-blue-500", "dark:bg-blue-600", "text-white");
                            document.getElementById(type).innerText = this.$t("Subscribe");
                            const nb_followers = document.getElementById("nb_followers");
                            nb_followers.innerText = parseInt(nb_followers.innerText, 10) - 1;
                        }
                    }
                });
            }
        }
    }
</script>