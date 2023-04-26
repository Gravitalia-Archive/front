// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            htmlAttrs: {
                lang: "fr"
            },
            charset: "utf-8",
            viewport: "width=device-width,initial-scale=1",
            title: "Gravitalia",
            meta: [
                { name: "description", content: "Connecting the world, allowing freedom is what Gravitalia does. Let us connect you!" },
                { name: "og:description", content: "Connecting the world, allowing freedom is what Gravitalia does. Let us connect you!" },
                { property: "og:type", content: "website" },
                { property: "og:site_name", content: "Gravitalia" },
                { property: "og:title", content: "Gravitalia" },
                { property: "og:image", content: "/favicon.webp" },
                { name: "theme-color", content: "#332b43" },
                { name: "robots", content: "index, follow" }
            ],
            link: [
                { rel: "icon", type: "image/webp", href: "/favicon.webp" }
            ],
            bodyAttrs: {
                class: "dark:bg-zinc-900 dark:text-white"
            }
        }
    },

    ssr: true,
    components: true,
    modules: [
        "@nuxtjs/tailwindcss",
        ["@nuxtjs/i18n", {
            defaultLocale: "en",
            lazy: true,
            langDir: "lang",
            detectBrowserLanguage: {
                useCookie: true,
                cookieKey: "lang",
                redirectOn: "root",
                strategy: "no_prefix",
                fallbackLocale: "en",
                alwaysRedirect: true
            },
            locales: [
                {
                    code: "en",
                    iso: "en-US",
                    file: "en-US.json",
                    name: "English"
                },
                {
                    code: "fr",
                    iso: "fr-FR",
                    file: "fr-FR.json",
                    name: "Français"
                }
            ],   
            baseUrl: "https://www.gravitalia.com"
        }],
        ["@nuxtjs/color-mode", {
            preference: 'system',
            fallback: 'light',
            hid: 'color-script',
            globalName: '__NUXT_COLOR_MODE__',
            componentName: 'ColorScheme',
            classPrefix: '',
            classSuffix: '',
            storageKey: 'mode'
          }]
    ], 

    experimental: {
        noScripts: false // Soon true, I hope
    },
    nitro: {
        preset: 'cloudflare'
    }
});
