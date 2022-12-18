<template>
    <div>
        <Navbar />
        <div align="center">
            <div class="h-[70vh]">
                <h1 class="text-5xl md:text-8xl text-dark font-extrabold max-w-4xl">Un meilleur moyen de vous connecter</h1> <!-- A better way to connect you -->
                <h2 id="take" class="fadeIn text-6xl md:text-8xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-yellow-500">Prenez.</h2> <!-- Take -->
                <h2 id="publish" class="fadeIn hidden text-6xl md:text-8xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-cyan-500">Publiez.</h2> <!-- Publish -->
                <h2 id="share" class="fadeIn hidden text-6xl md:text-8xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-red-700 to-violet-600">Partagez.</h2> <!-- Share -->
                <h2 id="like" class="fadeIn hidden text-6xl md:text-8xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-blue-600">Aimez.</h2> <!-- Like -->
                <br /><br /><br />
                <div class="flex justify-center items-align-center">
                    <a href="https://account-1hw.pages.dev/signup" class="rounded px-6 py-2 m-1 border-b-4 border-l-2 shadow-lg bg-blue-700 border-blue-800 text-white">
                    S'inscrire
                    </a>
                    <div class="pl-7"></div>
                    <a href="https://account-1hw.pages.dev/oauth2/authorize?response_type=code&client_id=?&scope=user" class="rounded px-4 py-2 m-1 border border-gray-200 dark:border-gray-800 hover:border-gray-200">
                    Se connecter
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
            <div class="h-48 w-[98.9vw] bg-red-50 dark:bg-indigo-800/[.50]">
                <p>test</p>
            </div>
        </div>
        <br /><br />
    </div>
</template>

<script setup>
    useHead({
        script: [
            { children: `const idList=["take","publish","share","like"];let last="take";setInterval(()=>{document.getElementById(last).classList.add("hidden"),(last=idList[idList.indexOf(last)+1])||(last="take"),document.getElementById(last).classList.remove("hidden")},2580);` }
        ]
    })
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
</style>