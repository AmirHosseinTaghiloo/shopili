export default defineNuxtConfig({
  devtools:{enabled:true},
  modules: ["@pinia/nuxt", "nuxt-swiper", "@nuxt/image", 'nuxt-schema-org', "@nuxt/ui"],
  // routeRules: {
  //   "/profile": { ssr: false },
  //   "/profile/**": { ssr: false },
  //   "/profile/**/**": { ssr: false },
  // },
  typescript: {
    tsConfig: {
      compilerOptions: {
        verbatimModuleSyntax: false
      }
    }
  },
  css: ["@/assets/css/custom.css", "@/assets/css/theme.css"],
  build: {
    transpile: ["vue-toastification"],
  },
  app: {
    pageTransition: {
      name: "page",
      mode: "out-in",
    },
    layoutTransition: {
      name: "layout",
      mode: "out-in",
    },
  },
  image: {
    domains: ["http://localhost:3000"],
    alias: {
      
    },
  },
  site: {
    url: 'http://localhost:3000/',
    name: 'شاپیلی ',
    defaultLocale:'fa'
  }
});