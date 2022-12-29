<template>
    <Navbar @userData="callback" />
    <p>{{ connected_user?.username }}</p>
    <p>aa {{ user?.username }}</p>
    <p>{{ gv_user?.posts?.length||0 }}</p>
</template>

<script setup>
    const { data: gv_user } = await useLazyFetch(`http://localhost:8888/users/${useRoute().params.id}`, { mode: "no-cors" });
</script>

<script>
    export default {
        data() {
            return {
                user: null
            }
        },
        
        async created() {
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