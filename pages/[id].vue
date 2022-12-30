<template>
    <Navbar @userData="callback" />
    <div class="flex justify-center">
        <div class="flex h-fit gap-10 w-[22%]">
        <img class="rounded-full w-32 h-32" src="/avatar/H.webp" draggable="false" alt="" />

        <div class="grid gap-3 w-full">
          <div>
            <div class="flex">
                <h1 class="text-xl font-light">{{ user.username }}</h1>
                <span class="pl-4"></span><button v-if="user.vanity !== vanity" class="w-46 bg-blue-500 dark:bg-blue-600 p-1.5 text-white text-xs rounded-md font-semibold">S'abonner</button>
                <button v-else class="w-46 bg-gray-200 dark:bg-gray-400 p-1.5 text-dark text-xs rounded-md font-semibold">Éditer le profil</button>
                <!-- <span class="pl-4"></span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7 cursor-pointer"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" /></svg> -->
            </div>
            <div class="ul flex w-full justify-between">
              <p><b>{{ gv_user.posts.length }}</b> {{ gv_user.posts.length > 1 ? "photos": "photo" }}</p>
              <p><b>{{ gv_user.followers }}</b> {{ gv_user.followers > 1 ? "abonnés": "abonné" }}</p>
              <p><b>{{ gv_user.following }}</b> {{ gv_user.following > 1 ? "abonnements": "abonnement" }}</p>
            </div>
          </div>
          <p><b class="pb-6">{{ user.vanity }}</b><br />{{ user.bio }}</p>
        </div>
  </div>
    </div>
    <hr class="my-8 h-px w-1/2 bg-gray-200 dark:bg-gray-700 border-0  mx-auto">
    <div class="pt-4 flex justify-center">
        <div class="w-1/2 grid grid-cols-3 space-x-7">
            <div v-for="post in gv_user.posts">
                <a :href="'/'+user.vanity+'/'+post.id" class="flex justify-start -space-x-[21.5rem]">
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
</template>

<script setup>
    const { data: gv_user } = await useLazyFetch(`http://localhost:8888/users/${useRoute().params.id}`, { mode: "no-cors" });
</script>

<script>
    export default {
        data() {
            return {
                user: null,
                vanity: ""
            }
        },
        
        async created() {
            if(useCookie("token")?.value) this.vanity = JSON.parse(atob(useCookie("token").value.split(".")[1])).sub;

            const { data } = await useFetch(`http://173.212.247.156/users/${useRoute().params.id}`, { mode: "no-cors" });
            this.user = data;

            useHead({
                meta: [
                    {
                        name: "description",
                        content: `Access to the ${this.user.username}'s photos and much more!`
                    },
                    {
                        property: "og:description",
                        content: `Access to the ${this.user.username}'s photos and much more!`
                    }
                ],
                title: `${this.user.username} (@${this.user.vanity}) / Gravitalia`
            });
        }
    }
</script>