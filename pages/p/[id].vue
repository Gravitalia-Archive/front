<template>
    <Navbar @userData="callback" />
    <div>
        <div class="flex h-[73vh] md:h-[75vh] xl:h-[80vh]">
            <div class="relative m-auto">
                <div class="flex flex-col lg:flex-row h-max w-full rounded-r border dark:border-zinc-800">
                    <img
                        v-for="image in post.hash.length"
                        :id="image"
                        :src="post?.hash ? runtimeConfig?.CDN_URL+'/t_post/'+post.hash[image-1]+'.webp' : ''"
                        :class="image === 1 ? 'max-h-[32rem]' : 'hidden max-h-[32rem]'"
                        alt=""
                        crossorigin="anonymous"
                        loading="eager"
                        decoding="sync"
                        :fetchpriority="image === 1 ? 'high' : 'low'"
                        referrerpolicy="no-referrer"
                        draggable="false"
                        :alt="post?.text"
                    />

                    <div class="flex justify-center space-x-4">
                        <button @click="next()" id="next_img" type="button" :class="post.hash.length > 1 ? 'absolute w-10 h-10 top-28 xl:top-64 inset-y-0 right-4 xl:right-[27rem] rounded-full bg-gray-200/70 flex justify-center items-center' : 'hidden absolute w-10 h-10 top-28 xl:top-64 inset-y-0 right-4 xl:right-[27rem] rounded-full bg-gray-200/70 flex justify-center items-center'">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                            <span class="sr-only">Next image</span>
                        </button>

                        <button @click="previous()" id="prev_img" type="button" class="hidden absolute w-10 h-10 inset-y-0 left-0 top-28 xl:top-64 rounded-full bg-gray-200/70 flex justify-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                            <span class="sr-only">Previous image</span>
                        </button>
                    </div>

                    <div class="pt-2 flex flex-col">
                        <div class="px-4 flex py-2">
                            <img :src='user?.avatar ? runtimeConfig.CDN_URL+"/t_profile/"+user.avatar+".webp" : "/avatar/"+(user?.username?.match("[A-z]") ? user.username.match("[A-z]")[0].toUpperCase() : "A")+".webp"' class="rounded-full h-8 w-8" alt="" />
                            <NuxtLink :to="'/'+post?.author" prefetch class="pt-1 pl-2 font-semibold text-sm">{{ post?.author || "Loading..." }}</NuxtLink>
                            <p class="text-sm text-gray-500 dark:text-gray-200 pt-1 pl-1.5">• {{ post?.id ? timestampToDate(snowflakeToTimestamp(post.id)) : $t("now") }}</p>

                            <button type="button" aria-label="Action menu" class="z-20 pl-16 lg:pl-40" @click="showMenu()">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                </svg>
                            </button>

                            <div id="show-menu" class="hidden pt-8 pl-16 lg:pl-80 absolute">
                                <div class="z-10 origin-top-right absolute right-0 mt-2 w-52 rounded-md shadow-lg py-1 bg-slate-100 dark:bg-zinc-800 dark:border dark:border-zinc-700 ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical">
                                    <svg class="absolute bottom-full right-4" width="22" height="13" viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg">
                                        <polygon class="fill-slate-100 dark:fill-zinc-800 dark:stroke-zinc-700" points="15, 0 30, 20 0, 20"/>
                                    </svg>
                                    <!-- <div class="w-full cursor-pointer" @click="navigator.clipboard.writeText(window.location.href),showMenu()"><span class="block px-4 py-2 text-sm text-gray-700 dark:text-white">{{ $t("Share") }}</span></div> -->
                                    <div class="w-full cursor-pointer" @click="showModal()"><span class="block px-4 py-2 text-sm font-semibold text-red-600 dark:text-white">{{ $t("Report") }}</span></div>
                                </div>
                            </div>
                        </div>

                        <hr class="h-px bg-gray-200 border-0 dark:bg-gray-700" />

                        <div v-if="post?.text" class="px-4 pt-4 flex">
                            <NuxtLink :to="'/'+post?.author" prefetch>
                                <img :src='user?.avatar ? runtimeConfig.CDN_URL+"/t_profile/"+user.avatar+".webp" : "/avatar/"+(user?.username?.match("[A-z]") ? user.username.match("[A-z]")[0].toUpperCase() : "A")+".webp"' class="rounded-full h-10 w-10" alt="" draggable="false" />
                            </NuxtLink>

                            <div class="flex-col">
                                <NuxtLink :to="'/'+post?.author" prefetch class="pt-1 pl-2 font-semibold text-sm">{{ post?.author || "Loading..." }}</NuxtLink>
                                <p class="pl-2 w-full text-sm text-gray-600 dark:text-white">{{ post?.text }}</p>
                            </div>
                        </div>

                        <div v-if="comments.length === 0 && (post?.comments.length === 0 || post?.comments[0].id === null)" class="pt-16 flex flex-col justify-center items-center">
                            <img src="/comment.svg" alt="" width="300" fetchpriority="low" />
                            <p class="font-semibold pt-6">{{ $t("Be the first to comment!") }}</p>
                        </div>
                        <div v-else class="pt-2">
                            <div v-for="comment in [...post?.comments, ...comments]" class="pt-1 pl-4 flex">
                                <NuxtLink :to="'/'+comment.user" prefetch class="font-semibold text-sm">{{ comment.user }}</NuxtLink>

                                <p class="pl-1 text-sm">
                                    {{ comment.text }}
                                </p>

                                <svg @click="deleteComment(comment.id)" v-if="me?.vanity && me?.vanity === comment.user" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="ml-1 mt-0.5 text-gray-600 w-4 h-4 cursor-pointer">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                            </div>
                        </div>

                        <div class="mt-auto w-full border-t dark:border-gray-700 p-2">
                            <div @click="relation('like')" class="flex cursor-pointer w-1/4">
                                <svg id="liked" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" :class="liked_post ? 'text-red-500 fill-red-500 w-6 h-6' : 'w-6 h-6'">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                </svg>
                                <p id="nb_likes" class="font-semibold text-sm pt-0.5 pl-1">{{ post?.like }} {{ $t("Like") }}</p>
                            </div>
                            
                            <div class="flex">
                                <input v-model="new_comment" type="text" class="mt-2.5 px-2 w-80 py-1 border-none rounded text-sm dark:bg-zinc-800 dark:placeholder-white" placeholder="Type your message..." maxlength="250" />
                                <button @click="addComment()" type="button" class="mx-4 pt-2 font-bold text-sm text-purple-500 disabled:text-purple-500/50 disabled:cursor-not-allowed" v-bind:disabled="new_comment === '' || !me?.vanity">
                                    {{ $t("Publish") }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="hidden lg:block">
        <Footer absolute="true" />
    </div>
    <SignalChoice :id="id" />
</template>

<script setup>
const runtimeConfig = useRuntimeConfig().public;
const token = useCookie("token");
const id = useRoute().params.id;

let { data: post } = token.value ? await useFetch(`${runtimeConfig?.API_URL || "https://api.gravitalia.com"}/posts/${id}`, {
    headers: {
        "Authorization": token.value
    }
}) : await useFetch(`${runtimeConfig?.API_URL || "https://api.gravitalia.com"}/posts/${id}`);

const { data: user } = await useFetch(`${runtimeConfig?.ACCOUNT_API_URL || "https://oauth.gravitalia.com"}/users/${post.value.author}`, {
    lazy: true,
    server: false
});

useHead({
    meta: [
        {
            name: "description",
            content: `View ${post.value.author}'s photo, with ${post.value.like} likes`
        },
        {
            property: "og:description",
            content: `View ${post.value.author}'s photo, with ${post.value.like} likes`
        },
        ,
        {
            property: "og:image",
            content: `${runtimeConfig?.CDN_URL}/t_media_lib_thumb/${post.value.hash[0]}.webp`
        },
        {
            property: "twitter:card",
            content: "summary_large_image"
        },
        {
            property: "twitter:url",
            content: `${runtimeConfig?.CDN_URL}/t_media_lib_thumb/${post.value.hash[0]}.webp`
        }
    ],
    link: [
        { rel: "canonical", href: `${runtimeConfig?.SITE_URL || "https://www.gravitalia.com"}/p/${id}` }
    ],
    script: [
        {
            type: "application/ld+json",
            children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "SocialMediaPosting",
                "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": `${runtimeConfig?.SITE_URL || "https://www.gravitalia.com"}/p/${id}`
                },
                "datePublished": "2023-01-01T12:00:00-07:00",
                "author": {
                    "@type": "Person",
                    "name": post.value.author,
                    "url": `${runtimeConfig?.SITE_URL || "https://www.gravitalia.com"}/${post.value.author}`
                },
                "publisher": {
                    "@type": "Organization",
                    "name": "Gravitalia",
                    "logo": {
                        "@type": "ImageObject",
                        "url": `${runtimeConfig?.SITE_URL || "https://www.gravitalia.com"}/favicon.webp`,
                        "width": 96,
                        "height": 96
                    }
                },
                "image": {
                    "@type": "ImageObject",
                    "url": `${runtimeConfig?.CDN_URL}/t_post/${post.value.hash[0]}.webp`,
                },
                "description": post.value.text
            })
        }
    ],
    title: "Gravitalia"
});

async function relation(type) {
    if(!useCookie("token").value) return await navigateTo(`${runtimeConfig?.API_URL || "https://api.gravitalia.com"}/callback`, { external: true });

    fetch(`${runtimeConfig?.API_URL || "https://api.gravitalia.com"}/relation/${type}`, {
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
        if(res.message === "Created relation") {
            document.getElementById("liked").classList.add("text-red-500");
            document.getElementById("liked").classList.add("fill-red-500");
            post.value.like += 1;
        } else {
            document.getElementById("liked").classList.remove("text-red-500");
            document.getElementById("liked").classList.remove("fill-red-500");
            post.value.like -= 1;
        }
    });
}

let last_photo = 1;
function previous() {
    last_photo--;

    if(last_photo < post.value.hash.length) {
        document.getElementById("next_img").classList.remove("hidden");
    }

    if (last_photo == 1) {
        document.getElementById("prev_img").classList.add("hidden");
    }

    document.getElementById((last_photo).toString()).classList.remove("hidden");
    document.getElementById("next_img").classList.remove("hidden");

    const old_img = document.getElementById((last_photo+1).toString());
    old_img.classList.add("hidden");
}

function next() {
    last_photo++;

    if(last_photo >= post.value.hash.length) {
        document.getElementById("next_img").classList.add("hidden");
    }

    if (last_photo > 1) {
        document.getElementById("prev_img").classList.remove("hidden");
    }

    document.getElementById((last_photo-1).toString()).classList.add("hidden");

    const new_img = document.getElementById((last_photo).toString());
    if(new_img.src && new_img.src?.includes("cloud")) {
        new_img.classList.remove("hidden");
    } else {
        document.getElementById("next_img").classList.add("hidden");
    }
}
</script>

<script>
    export default {
        data() {
            return {
                me: null,
                runtimeConfig: useRuntimeConfig().public,
                liked_post: false,
                new_comment: "",
                comments: []
            }
        },

        async mounted() {
            this.liked_post = useCookie("token").value ? await fetch(`${this.runtimeConfig?.API_URL || "https://api.gravitalia.com"}/relation/like?target=${useRoute().params.id}`, {
                headers: {
                    "Authorization": useCookie("token").value
                }
            })
            .then(res => res.json())
            .then(res => res.message === "existent") : false;
        },

        methods: {
            callback(data) {
                this.me = data;
            },

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

            snowflakeToTimestamp(snowflake) {
                const EPOCH_OFFSET = 1672600000000;

                return ((snowflake >> 22) + EPOCH_OFFSET);
            },

            timestampToDate(timestamp) {
                const date = new Date(timestamp);
                const day = date.getDate();
                const month = date.getMonth() + 1;

                return ((day < 10) ? '0' + day : day) + '/' + ((month < 10) ? '0' + month : month) + '/' + date.getFullYear();
            },

            addComment() {
                if(this.new_comment === "" || !this.me?.vanity) return;

                fetch(`${this.runtimeConfig?.API_URL || "https://api.gravitalia.com"}/comment/${useRoute().params.id}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": useCookie("token").value
                    },
                    body: JSON.stringify({
                        content: this.new_comment
                    })
                })
                .then(res => res.json())
                .then(res => {
                    if(!res.error) {
                        this.comments.push({
                            "id": res.message,
                            "love": 0,
                            "me_loved": false,
                            "text": this.new_comment,
                            "timestamp": null,
                            "user": this.me.vanity
                        })
                        this.new_comment = "";
                    }
                });
            },

            deleteComment(id) {
                fetch(`${this.runtimeConfig?.API_URL || "https://api.gravitalia.com"}/comment/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": useCookie("token").value
                    }
                })
                .then(res => res.json())
                .then(res => {
                    if(!res.error) {
                        // Delete comment from post instead of reload page
                        window.location.reload();
                    }
                });
            }
        }
    }
</script>