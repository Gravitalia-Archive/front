<template>
    <Navbar @userData="callback" />
    <div class="flex h-[73vh] md:h-[75vh] xl:h-[80vh]">
        <div class="relative m-auto">
            <div class="flex flex-col lg:flex-row h-max w-full rounded-r border">
                <!-- Caroussel project (slide images)
                    <img class="h-[32rem]" src="https://res.cloudinary.com/dimtq5hwr/image/upload/s--aGjfwk1t--/f_auto,q_auto/3223c34b25c0e3c9d349e6e5ab59c21f" alt="" />
                    <img class="h-[32rem] hidden" src="https://res.cloudinary.com/dimtq5hwr/image/upload/s--aGjfwk1t--/f_auto,q_auto/3223c34b25c0e3c9d349e6e5ab59c21f" alt="" />

                    <div class="flex justify-center space-x-4">
                        <button type="button" class="absolute w-2.5 h-2.5 bottom-6 left-1/2 rounded-full bg-gray-900"><span class="sr-only">Next image</span></button>
                        <button type="button" class="absolute w-2.5 h-2.5 bottom-6 left-1/2 rounded-full bg-gray-900"><span class="sr-only">Next image</span></button>
                    </div>
                -->

                <img id="1" src="" class="hidden max-w-sm lg:max-w-lg max-h-[32rem]" alt="" />
                
                <div id="drop" class="flex">
                    <label for="dropzone" class="flex flex-col items-center justify-center w-full lg:w-96 h-[32rem] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div class="flex flex-col items-center justify-center">
                            <svg aria-hidden="true" class="w-10 h-10  text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                            <p class=" text-sm text-gray-500 dark:text-gray-400 font-semibold">{{ $t("Click to upload or drag and drop") }}</p>
                            <p class="text-xs text-gray-500 dark:text-gray-400">{{ $t("SVG, WEBP, PNG or JPG") }}</p>
                        </div>
                        <input id="dropzone" type="file" accept="image/jpeg,image/png,image/webp,image/svg+xml" class="hidden" />
                    </label>
                </div>

                <div class="px-4 pt-2">
                    <div class="flex py-2">
                        <img :src="runtimeConfig?.CDN_URL+'/t_avatar/'+user.avatar+'.webp'" class="rounded-full h-8 w-8" alt="" />
                        <NuxtLink :to="'/'+user.vanity" prefetch class="pt-1 pl-2 font-semibold text-sm">{{ user.vanity }}</NuxtLink>
                        <p class="text-sm text-gray-500 pt-1 pl-1.5">{{ $t("• now") }}</p>

                        <span class="pl-16 lg:pl-40 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7 cursor-pointer">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                            </svg>
                        </span>
                    </div>

                    <hr />

                    <textarea id="message" :placeholder='$t("Add a legend, in 2,000 characters")' maxlength="2000" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>

                    <button type="button" class="mt-12 lg:mt-72 h-11 w-full py-2 bg-green-500 hover:bg-green-700 transition-colors duration-300 text-white rounded-md">{{ $t("Publish") }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                user: null,
                runtimeConfig: useRuntimeConfig().public
            }
        },

        async mounted() {
            document.getElementById("drop").addEventListener("change", (e) => {
                this.update_image(e.target.files);
            });

            document.getElementById("drop").addEventListener("dragover", (e) => {
                e.preventDefault();
            });

            document.getElementById("drop").addEventListener("drop", (e) => {
                e.preventDefault();
                this.update_image(e.dataTransfer.files);
            });

            const token = useCookie("token");
            if(token.value) {
                this.user = await fetch(`${this.runtimeConfig?.API_URL || "https://api.gravitalia.com"}/users/@me`, {
                    headers: {
                        "Authorization": token.value
                    }
                })
                .then(res => res.json());
            }

            if(!this.user) return await navigateTo(`${this.runtimeConfig?.API_URL || "https://api.gravitalia.com"}/callback`, { external: true });
        },

        methods: {
            async callback(data) {
                if(!data) return await navigateTo(`${this.runtimeConfig?.API_URL || "https://api.gravitalia.com"}/callback`, { external: true });
            },

            update_image(files) {
                if (files && files.length > 0) {
                    const file = files[0];
                    if (file.type.startsWith('image/')) {
                        const reader = new FileReader();

                        reader.onload = async (event) => {
                            document.getElementById("1").src = event.target.result;
                        };

                        reader.readAsDataURL(file);
                        
                        document.getElementById("1").classList.remove("hidden");
                        document.getElementById("drop").classList.add("hidden");
                    }
                }
            }
        }
    }
</script>