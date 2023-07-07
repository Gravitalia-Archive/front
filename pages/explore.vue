<template>
    <div>
        <Navbar />
        <p>Soon</p>
    </div>
</template>

<script setup>
    useHead({
        htmlAttrs: {
            lang: useI18n().locale
        },
        meta: [
            {
                name: "description",
                content: "Connecting the world, allowing freedom is what Gravitalia does. Let us connect you!"
            },
            {
                property: "og:description",
                content: "Connecting the world, allowing freedom is what Gravitalia does. Let us connect you!"
            }
        ],
        link: [
            { rel: "canonical", href: `${useRuntimeConfig().public?.SITE_URL || "https://www.gravitalia.com"}/explore` }
        ],
        title: "Gravitalia"
    });
</script>