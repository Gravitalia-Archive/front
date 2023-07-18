<template>
</template>

<script setup>
    const route = useRoute();
    if(!route.query.token) {
        await navigateTo(`${useRuntimeConfig().public?.API_URL || "https://api.gravitalia.com"}/callback`, { external: true, redirectCode: 307 });
    }

    const token = useCookie("token", { maxAge: 604800, httpOnly: false, secure: true, sameSite: "strict", domain: "gravitalia.com" });
    token.value = route.query.token;
    await navigateTo("/");
</script>