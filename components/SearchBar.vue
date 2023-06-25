<template>
    <div class="flex flex-col items-center">
        <div class="relative mt-1 ml-16 xl:ml-60 text-gray-600">
            <input type="search" :placeholder='$t("Search")' v-model="query" class="bg-white h-9 px-11 pr-10 xl:pr-48 rounded-full text-sm focus:outline-none" />
            <button aria-label="Search bar" class="absolute right-0 top-0 mt-2.5 mr-4">
                <svg class="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 56.966 56.966"  xmlSpace="preserve" width="512px" height="512px">
                    <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"/>
                </svg>
            </button>
        </div>
        <div v-if="results.length != 0" v-for="result of results" class="absolute border mt-12 ml-16 xl:ml-60 rounded w-2/3 xl:w-80 max-h-md bg-white">
            <NuxtLink prefetch :to="'/'+result.vanity" class="py-2 flex justify-center">
                <img :src='result.avatar ? runtimeConfig.CDN_URL+"/t_profile/"+result.avatar+".webp"  : "/avatar/"+(result.username.match("[A-z]") ? result.username.match("[A-z]")[0].toUpperCase() : "A")+".webp"' alt="" class="rounded-full w-11 h-11" />
                <div class="flex-col pl-1.5">
                    <p class="font-semibold">{{ result.username }}</p>
                    <p class="text-gray-500 text-sm">{{ result.vanity }}</p>
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