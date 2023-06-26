<template>
    <div class="flex flex-col items-center justify-center mb-10">
        <NuxtLink :to="'/p/'+recommendation.id" class="w-11/12 lg:w-1/3 h-1/4 border border-gray-200 dark:border-gray-700 rounded shadow py-5 px-8">
            <div class="flex items-center mt-4">
                <img :src='user?.avatar ? runtimeConfig.CDN_URL+"/t_profile/"+user.avatar+".webp" : "/avatar/"+(user?.username?.match("[A-z]") ? user.username.match("[A-z]")[0].toUpperCase() : "A")+".webp"' class="rounded-full h-8 w-8" alt="" fetchpriority="low" />
                <NuxtLink :to="'/'+recommendation?.author" prefetch class="pl-2 font-semibold text-sm">{{ recommendation?.author || "Loading..." }}</NuxtLink>
            </div>

            <div class="pt-6">
                <div class="flex items-center justify-center h-72 lg:h-80 bg-gray-300 rounded dark:bg-gray-700">
                    <img
                        :id="image"
                        :src="recommendation?.hash ? runtimeConfig?.CDN_URL+'/t_post/'+recommendation.hash[0]+'.webp' : ''"
                        class="max-h-[32rem]"
                        alt=""
                        crossorigin="anonymous"
                        loading="eager"
                        decoding="sync"
                        fetchpriority="low"
                        referrerpolicy="no-referrer"
                        draggable="false"
                        :alt="recommendation?.text"
                    />
                </div>
            </div>
                        
            <div class="pt-2 flex items-center space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                </svg>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
            </div>
            <div class="pt-2">
                <p class="text-sm">{{ recommendation?.like }} {{ $t("Like") }}</p>
            </div>

            <div v-if="recommendation?.text" class="flex pt-4 space-x-2">
                <NuxtLink :to="'/'+recommendation?.author" prefetch class="pl-2 font-semibold text-sm">{{ recommendation?.author || "Loading..." }}</NuxtLink>

                <p class="text-sm">
                    {{ recommendation?.text }}
                </p>
            </div>
        </NuxtLink>
    </div>
</template>

<script>
    export default {
        props: {
            recommendation: {
                required: true
            }
        },

        data() {
            return {
                user: null
            }
        },

        async mounted() {
            console.log(this.recommendation?.text)
        }
    }
</script>