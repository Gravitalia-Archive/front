<template>
    <div>
        <Navbar />
        <div align="center">
            <div class="h-[73vh] md:h-[75vh] xl:h-[80vh]">
                <h1 class="text-5xl md:text-8xl text-dark font-extrabold max-w-4xl">{{ $t("A better way to connect you") }}</h1>
                <h2 id="take" class="fadeIn text-6xl md:text-8xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-yellow-500">{{ $t("Take.") }}</h2>
                <h2 id="publish" class="fadeIn hidden text-6xl md:text-8xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-cyan-500">{{ $t("Publish.") }}</h2>
                <h2 id="share" class="fadeIn hidden text-6xl md:text-8xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-red-700 to-violet-600">{{ $t("Share.") }}</h2>
                <h2 id="like" class="fadeIn hidden text-6xl md:text-8xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-blue-600">{{ $t("Like.") }}</h2>
                <br /><br /><br />
                <div class="flex justify-center items-align-center">
                    <a href="https://account-1hw.pages.dev/signup" class="rounded px-6 py-2 m-1 border-b-4 border-l-2 shadow-lg bg-blue-700 border-blue-800 text-white">
                        {{ $t("Sign up") }}
                    </a>
                    <div class="pl-7"></div>
                    <a href="https://account-1hw.pages.dev/oauth2/authorize?response_type=code&client_id=?&scope=user" class="rounded px-4 py-2 m-1 border border-gray-200 dark:border-gray-800 hover:border-gray-200">
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
    </div>

    <div class="h-screen">
        <div class="h-1/3"><br /></div>
        <div class="flex justify-center">
            <h1 class="flex font-bold text-4xl text-transparent bg-clip-text bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500">{{ $t("Join us") }}</h1><span class="animate-waving-hand text-4xl">👋🏻</span>
        </div>
        <br />
        <div class="flex justify-center">
            <a href="https://account-1hw.pages.dev/oauth2/authorize?response_type=code&client_id=?&scope=user" class="rounded px-4 py-2 m-1 border border-gray-200 dark:border-gray-800 hover:border-gray-200">
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
    <Footer />
</template>

<script setup>
    useHead({
        script: [
            { children: `const idList=["take","publish","share","like"];let last="take";setInterval(()=>{document.getElementById(last).classList.add("hidden"),(last=idList[idList.indexOf(last)+1])||(last="take"),document.getElementById(last).classList.remove("hidden")},2580);` }
        ]
    });
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