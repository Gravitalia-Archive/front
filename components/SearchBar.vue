<template>
    <div class="flex flex-col items-center">
        <div class="mt-2 bg-white dark:bg-zinc-900 xl:ml-60 flex h-fit items-center gap-3 overflow-hidden rounded-lg px-8 py-1.5">
            <svg class="h-4 w-4 fill-zinc-500" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 56.966 56.966"  xmlSpace="preserve" width="512px" height="512px">
                <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"/>
            </svg>
            <input type="search" :placeholder='$t("Search")' v-model="query" class="h-full w-full bg-transparent focus:outline-none font-thin" />
        </div>

        <div v-if="results.length != 0" class="z-10 absolute border mt-12 xl:ml-60 rounded w-2/3 xl:w-80 max-h-md bg-white dark:bg-zinc-800 dark:border dark:border-zinc-700">
            <NuxtLink v-for="result of results" prefetch :to="'/'+result.vanity" class="py-2 flex pl-4 xl:pl-20">
                <img :src='result.avatar ? runtimeConfig.CDN_URL+"/t_profile/"+result.avatar+".webp"  : "/avatar/"+(result.username.match("[A-z]") ? result.username.match("[A-z]")[0].toUpperCase() : "A")+".webp"' alt="" class="rounded-full w-11 h-11" />
                <div class="flex-col pl-1.5">
                    <p class="font-semibold">{{ result.username }}</p>
                    <p class="text-gray-500 dark:text-gray-300 text-sm">{{ result.vanity }}</p>
                </div>
            </NuxtLink>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                query: "",
                results: [],
                runtimeConfig: useRuntimeConfig().public
            }
        },

        watch: {
            query(newQuery, oldQuery) {
                this.results = [];
                if(newQuery === "") return;

                fetch(`${this.runtimeConfig?.API_URL || "https://api.gravitalia.com"}/search/research?q=${newQuery}`)
                    .then(res => res.json())
                    .then(async (res) => {
                        for(const vanity of res) {
                            this.results.push(await this.get_user(vanity))
                        }
                    });
            }
        },

        methods: {
            get_user(vanity) {
                return fetch(`${this.runtimeConfig?.ACCOUNT_API_URL || "https://oauth.gravitalia.com"}/users/${vanity}`)
                    .then(res => res.json());
            }
        }
    }
</script>