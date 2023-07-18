<template>
    <div>
        <Navbar @userData="callback" />
        <div v-if="user">
            <div v-if="recommendation === null">
                <div class="flex flex-col items-center justify-center mb-24">
                    <div role="status" class="w-11/12 lg:w-1/3 h-1/4 border border-gray-200 dark:border-gray-700 rounded shadow animate-pulse py-5 px-8">
                        <div class="flex items-center mt-4 space-x-3">
                            <svg class="text-gray-200 w-14 h-14 dark:text-gray-700" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path>
                            </svg>
                            <div>
                                <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
                                <div class="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                            </div>
                        </div>

                        <div class="pt-6">
                            <div class="flex items-center justify-center h-72 lg:h-80 bg-gray-300 rounded dark:bg-gray-700">
                                <svg class="w-12 h-12 text-gray-200 dark:text-gray-600" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"/></svg>
                            </div>
                        </div>
                        
                        <div class="pt-2 flex items-center space-x-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-700">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                            </svg>

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-700">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                            </svg>

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-700">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                            </svg>
                        </div>
                        <div class="pt-2"><div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-12"></div></div>

                        <div class="pt-6 flex items-center w-full space-x-2">
                            <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
                            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                        </div>
                        <div class="pt-3 flex items-center w-full space-x-2 max-w-[480px]">
                            <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                    <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                        </div>

                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
            <div v-else-if="recommendation.length === 0">
                <div class="h-[73vh] md:h-[75vh] xl:h-[80vh] flex flex-col items-center justify-center">
                    <img alt="" src="/be_first.svg" width="400" />
                    <p class="pt-8 text-2xl font-bold">{{ $t("You are the first one here! And there is nothing...") }}</p>
                    <NuxtLink to="/upload"><p class="text-md font-medium text-blue-600 dark:text-blue-500 hover:text-blue-800">{{ $t("Share your first adventure here") }}</p></NuxtLink>
                </div>
                <br /><br />
            </div>
            <div v-else>
                <div v-for="r in recommendation">
                    <Card :recommendation="r" />
                </div>
            </div>
        </div>
        <div v-else>
            <div align="center">
                <div class="h-[73vh] md:h-[75vh] xl:h-[80vh]">
                    <h1 class="text-5xl md:text-8xl text-dark font-extrabold max-w-4xl">{{ $t("A better way to connect you") }}</h1>
                    <h2 id="take" class="fadeIn text-6xl md:text-8xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-yellow-500">{{ $t("Take.") }}</h2>
                    <h2 id="publish" class="fadeIn hidden text-6xl md:text-8xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-cyan-500">{{ $t("Publish.") }}</h2>
                    <h2 id="share" class="fadeIn hidden text-6xl md:text-8xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-red-700 to-violet-600">{{ $t("Share.") }}</h2>
                    <h2 id="like" class="fadeIn hidden text-6xl md:text-8xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-blue-600">{{ $t("Like.") }}</h2>
                    <br /><br /><br />
                    <div class="flex justify-center items-align-center">
                        <a href="https://account.gravitalia.com/signup" class="rounded px-6 py-2 m-1 border-b-4 border-l-2 shadow-lg bg-blue-700 border-blue-800 text-white">
                            {{ $t("Sign up") }}
                        </a>
                        <div class="pl-7"></div>
                        <a :href="(runtimeConfig?.API_URL || 'https://api.gravitalia.com')+'/callback'" class="rounded px-4 py-2 m-1 border border-gray-200 dark:border-gray-800 hover:border-gray-200">
                            {{ $t("Sign in") }}
                        </a>
                    </div>
                </div>
                <br />
                <div class="scroll-downs">
                    <div class="mousey border-dark dark:border-white">
                        <div class="scroller bg-dark dark:bg-white"></div>
                    </div>
                </div>
            </div>
            <br /><br />
            <div>
                <div class="h-26 w-full bg-orange-100 dark:bg-orange-600"><br /></div>
                <div class="h-80 w-full bg-orange-100 dark:bg-orange-600 flex">
                    <p class="text-4xl text-orange-600 dark:text-orange-200 lg:pl-72 pt-28 max-w-4xl">{{ $t("Share your photos to your closest friends") }}</p>
                    <img alt="" class="z-10 h-42 w-full hidden lg:block" src="/share.svg" />
                </div>
                <div class="h-26 w-full bg-orange-100 dark:bg-orange-600"><br /></div>
            </div>

            <div class="h-26 w-full bg-cyan-100 dark:bg-cyan-600"><br /></div>
            <div class="h-80 w-full bg-cyan-100 dark:bg-cyan-600 flex">
                <p class="text-4xl text-cyan-600 dark:text-cyan-200 lg:pl-72 pt-28 max-w-4xl">{{ $t("Support those you love") }}</p>
                <img alt="" class="z-10 h-42 w-full hidden lg:block" src="/like.svg" />
            </div>
            <div class="h-26 w-full bg-cyan-100 dark:bg-cyan-600"><br /></div>

            <div>
                <div class="h-26 w-full bg-green-100 dark:bg-green-600"><br /></div>
                <div class="h-80 w-full bg-green-100 dark:bg-green-600 flex slide">
                    <p class="text-4xl text-green-600 dark:text-green-200 lg:pl-72 pt-28 max-w-4xl">{{ $t("Be open to the world, and talk to everyone") }}</p>
                    <img alt="" class="z-10 h-42 w-full hidden lg:block" src="/messages.svg" />
                </div>
                <div class="h-26 w-full bg-green-100 dark:bg-green-600"><br /></div>
            </div>
            <br /><br />

            <div class="h-screen">
                <div class="h-1/3"><br /></div>
                <div class="flex justify-center">
                    <h1 class="flex font-bold text-4xl text-transparent bg-clip-text bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500">{{ $t("Join us") }}</h1><span class="animate-waving-hand text-4xl">👋🏻</span>
                </div>
                <br />
                <div class="flex justify-center">
                    <a :href="(runtimeConfig?.API_URL || 'https://api.gravitalia.com')+'/callback'" class="rounded px-4 py-2 m-1 border border-gray-200 dark:border-gray-800 hover:border-gray-200">
                        {{ $t("Sign in") }}
                    </a>
                </div>
                <div class="hidden lg:block">
                    <br /><br />
                    <div class="flex justify-center">
                        <div class="grid grid-cols-3 pl-32">
                            <div class="w-2/3">
                                <p class="text-2xl font-semibold">{{ $t("Free") }}</p>
                                <p class="text-gray-700 dark:text-gray-300">{{ $t("100% free, and forever!") }}</p>
                            </div>

                            <div class="w-2/3">
                                <p class="text-2xl font-semibold">{{ $t("Respectful") }}</p>
                                <p class="text-gray-700 dark:text-gray-300">{{ $t("No advertising or sale of data") }}</p>
                            </div>

                            <div class="w-2/3">
                                <p class="text-2xl font-semibold">{{ $t("Light") }}</p>
                                <p class="text-gray-700 dark:text-gray-300">{{ $t("We never bother you") }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer :absolute="user && (recommendation == null || recommendation.length < 2)" />
    </div>
</template>

<script setup>
useHead({
    htmlAttrs: {
        lang: useI18n().locale
    },
    meta: [
        {
            name: "description",
            content: "Connecting the world, allowing freedom is what Gravitalia does. Let us connect you!"
        },
        {
            property: "og:description",
            content: "Connecting the world, allowing freedom is what Gravitalia does. Let us connect you!"
        }
    ],
    link: [
        { rel: "canonical", href: `${useRuntimeConfig().public?.SITE_URL || "https://www.gravitalia.com"}/` }
    ],
    title: "Gravitalia"
});
</script>

<script>
    export default {
        data() {
            return {
                user: null,
                recommendation: null,
                runtimeConfig: useRuntimeConfig().public
            }
        },

        async mounted() {
            const token = useCookie("token");
            if(token.value) {
                this.recommendation = await fetch(`${this.runtimeConfig?.API_URL || "https://api.gravitalia.com"}/recommendation/for_you_feed`, {
                    headers: {
                        "Authorization": token.value
                    }
                })
                .then(res => res.json());

                if(this.recommendation?.error) {
                    token.value = null;
                    await navigateTo("/callback");
                }
            }

            if(!this.user) {
                const idList = ["take", "publish", "share", "like"];
                let currentIdIndex = 0;
                setInterval(() => {
                    document.getElementById(idList[currentIdIndex]).classList.add("hidden")
                    currentIdIndex = (currentIdIndex + 1) % idList.length;
                    document.getElementById(idList[currentIdIndex]).classList.remove("hidden");
                }, 2580);
            }
        },

        methods: {
            callback(data) {
                this.user = data;
            }
        }
    }
</script>

<style>
    .fadeIn {
        -webkit-animation: fadein 1.3s; /* Safari, Chrome and Opera > 12.1 */
        -moz-animation: fadein 1.3s; /* Firefox < 16 */
        -ms-animation: fadein 1.3s; /* Internet Explorer */
        -o-animation: fadein 1.3s; /* Opera < 12.1 */
            animation: fadein 1.3s;
    }

    @keyframes fadein {
        from { opacity: 0; }
        to   { opacity: 1; }
    }

    /* Firefox < 16 */
    @-moz-keyframes fadein {
        from { opacity: 0; }
        to   { opacity: 1; }
    }

    /* Safari, Chrome and Opera > 12.1 */
    @-webkit-keyframes fadein {
        from { opacity: 0; }
        to   { opacity: 1; }
    }

    /* Internet Explorer */
    @-ms-keyframes fadein {
        from { opacity: 0; }
        to   { opacity: 1; }
    }

    /* Opera < 12.1 */
    @-o-keyframes fadein {
        from { opacity: 0; }
        to   { opacity: 1; }
    }
    .scroll-downs {
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;
        
        width :34px;
        height: 55px;
        }

    .mousey {
        width: 3px;
        padding: 10px 15px;
        height: 35px;
        border: 2px solid;
        border-radius: 25px;
        opacity: 0.75;
        box-sizing: content-box;
    }
    .scroller {
        width: 3px;
        height: 10px;
        border-radius: 25%;
        animation-name: scroll;
        background-color: #24292e;
        animation-duration: 2.2s;
        animation-timing-function: cubic-bezier(.15,.41,.69,.94);
        animation-iteration-count: infinite;
    }
    @keyframes scroll {
        0% { opacity: 0; }
        10% { transform: translateY(0); opacity: 1; }
        100% { transform: translateY(15px); opacity: 0;}
    }

    .slide {
        left: -100vw;
        -webkit-animation: slide 0.5s forwards;
        -webkit-animation-delay: 1s;
        animation: slide 0.5s forwards;
        animation-delay: 1s;
    }

    @-webkit-keyframes slide {
        100% { left: 0; }
    }

    @keyframes slide {
        100% { left: 0; }
    }
</style>