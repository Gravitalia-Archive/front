<template>
    <p id="error" class="hidden flex h-10 items-center justify-center bg-[#332b43] px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
        {{ $t("Oops! An error occurred while uploading, please try again later!") }}
    </p>

    <Navbar @userData="callback" />
    <div class="flex h-[73vh] md:h-[75vh] xl:h-[80vh]">
        <div class="relative m-auto">
            <div class="flex flex-col lg:flex-row h-max w-full rounded-r border dark:border-zinc-700">
                    <img v-for="id in max_photo" :id="id" class="max-h-[36rem] 4xl:max-h-[42rem] hidden" src="" alt="" />

                    <div class="flex justify-center space-x-4">
                        <button @click="next()" id="next_img" type="button" class="hidden absolute w-10 h-10 top-64 inset-y-0 right-4 xl:right-96 rounded-full bg-gray-200/70 flex justify-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                            <span class="sr-only">Next image</span>
                        </button>

                        <button @click="previous()" id="prev_img" type="button" class="hidden absolute w-10 h-10 inset-y-0 left-0 top-64 rounded-full bg-gray-200/70 flex justify-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                            <span class="sr-only">Previous image</span>
                        </button>
                    </div>

                <div id="drop" class="flex">
                    <label for="dropzone" class="flex flex-col items-center justify-center w-full md:w-[28rem] h-[36rem] 4xl:h-[42rem] border-2 border-gray-300 border-dashed rounded-r cursor-pointer bg-gray-50 dark:hover:bg-zinc-800 dark:bg-zinc-800 hover:bg-gray-100 dark:border-zinc-700 dark:hover:bg-zinc-900">
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
                        <img :src='user?.avatar ? runtimeConfig.CDN_URL+"/t_profile/"+user.avatar+".webp"  : "/avatar/"+(user?.username.match("[A-z]") ? user.username.match("[A-z]")[0].toUpperCase() : "A")+".webp"' class="rounded-full h-8 w-8" alt="" />
                        <NuxtLink :to="'/'+user?.vanity" prefetch class="pt-1 pl-2 font-semibold text-sm">{{ user?.vanity }}</NuxtLink>
                        <p class="text-sm text-gray-500 dark:text-gray-300 pt-1 pl-1.5">• {{ $t("now") }}</p>

                        <span class="pl-16 lg:pl-40 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7 cursor-pointer">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                            </svg>
                        </span>
                    </div>

                    <hr class="h-px bg-gray-200 border-0 dark:bg-zinc-600" />

                    <textarea v-model="description" :placeholder='$t("Add a legend, in 2,000 characters")' maxlength="2000" rows="4" class="mt-2 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-800 dark:border-zinc-800 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>

                    <button type="button" id="publish_btn" @click="publish()" disabled class="flex justify-center items-center mt-12 lg:mt-[22rem] h-11 w-full py-2 bg-green-500 disabled:bg-green-500/50 disabled:cursor-not-allowed hover:bg-green-700 disabled:hover:bg-green-500/50 transition-colors duration-300 text-white rounded-md">
                        {{ $t("Publish") }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                me: null,
                user: null,
                runtimeConfig: useRuntimeConfig().public,
                description: "",
                max_photo: 5,
                last_photo: 1
            }
        },

        async mounted() {
            const token = useCookie("token");
            if(token.value) {
                this.me = await fetch(`${this.runtimeConfig?.API_URL || "https://api.gravitalia.com"}/users/@me`, {
                    headers: {
                        "Authorization": token.value
                    }
                })
                .then(res => res.json());
            }

            if(!this.me) return await navigateTo(`${this.runtimeConfig?.API_URL || "https://api.gravitalia.com"}/callback`, { external: true });

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
        },

        methods: {
            async callback(data) {
                if(!data) return await navigateTo(`${this.runtimeConfig?.API_URL || "https://api.gravitalia.com"}/callback`, { external: true });
                else this.user = data;
            },

            previous() {
                this.last_photo--;

                if(this.last_photo < this.max_photo) {
                    document.getElementById("next_img").classList.remove("hidden");
                }
                
                if (this.last_photo == 1) {
                    document.getElementById("prev_img").classList.add("hidden");
                }

                document.getElementById((this.last_photo).toString()).classList.remove("hidden");

                const old_img = document.getElementById((this.last_photo+1).toString());
                old_img.classList.add("hidden");
                document.getElementById("drop").classList.add("hidden");
            },

            next() {
                this.last_photo++;

                if(this.last_photo >= this.max_photo) {
                    document.getElementById("next_img").classList.add("hidden");
                }

                if (this.last_photo > 1) {
                    document.getElementById("prev_img").classList.remove("hidden");
                }

                document.getElementById((this.last_photo-1).toString()).classList.add("hidden");

                const new_img = document.getElementById((this.last_photo).toString());
                if(new_img.src && new_img.src?.includes("data:image/")) {
                    new_img.classList.remove("hidden");
                    document.getElementById("drop").classList.add("hidden");
                } else {
                    document.getElementById("next_img").classList.add("hidden");
                    document.getElementById("drop").classList.remove("hidden");
                }
            },

            update_image(files) {
                if (files && files.length > 0) {
                    const file = files[0];
                    if (file.type.startsWith('image/')) {
                        const reader = new FileReader();

                        reader.onload = async (event) => {
                            document.getElementById(this.last_photo.toString()).src = event.target.result;
                        };

                        reader.readAsDataURL(file);
                        
                        document.getElementById(this.last_photo.toString()).classList.remove("hidden");
                        document.getElementById("drop").classList.add("hidden");
                        document.getElementById("publish_btn").disabled = false;

                        document.getElementById("next_img").classList.remove("hidden");
                    }
                }
            },

            async publish() {
                document.getElementById("publish_btn").disabled = true;
                document.getElementById("publish_btn").innerHTML = '<svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/></svg>';

                let images = [];
                for(let id = 1; id < this.max_photo+1; id++) {
                    let doc = document.getElementById(id.toString());
                    if(doc.src && doc.src?.includes("data:image/")) {
                        images.push(Array.from(new Uint8Array(await (await fetch(doc.src)).arrayBuffer())))
                    } else {
                        break;
                    }
                }

                fetch(`${this.runtimeConfig?.API_URL || "https://api.gravitalia.com"}/posts/new`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": useCookie("token").value
                    },
                    body: JSON.stringify({
                        description: this.description,
                        images
                    })
                })
                .then(res => res.json())
                .then(async (res) => {
                    document.getElementById("publish_btn").disabled = false;
                    document.getElementById("publish_btn").innerHTML = this.$t("Publish");

                    if(res.error) {
                        document.getElementById("error").classList.remove("hidden");
                    } else {
                        return await navigateTo(`/p/${res.message}`);
                    }
                });
            }
        }
    }
</script>