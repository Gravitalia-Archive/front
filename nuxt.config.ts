// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
      head: {
          htmlAttrs: {
              lang: "en"
          },
          charset: "utf-8",
          viewport: "width=device-width,initial-scale=1",
          title: "Gravitalia",
          meta: [
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
        strategy: "no_prefix",
        lazy: true,
        langDir: "lang",
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: "lang",
            redirectOn: "root",
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

  runtimeConfig: {
      public: {
          ACCOUNT_API_URL: "https://oauth.gravitalia.com",
          API_URL: "https://api.gravitalia.com",
          CDN_URL: "https://res.cloudinary.com/dimtq5hwr/image/upload/s--4SMIfypA--",
          SITE_URL: "https://www.gravitalia.com"
      }
  },
  
  nitro: {
      preset: 'cloudflare'
  }
});
