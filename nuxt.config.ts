// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    ["@pinia/nuxt", { autoImports: ["defineStore", "acceptHMRUpdate"] }],
    "nuxt-primevue",
  ],
  primevue: {
    options: {
      ripple: true,
    },
    components: {
      prefix: "Prime",
      include: "*",
      // include: ["Button", "DataTable"],
    },
  },
  pinia: {
    storesDirs: ["./stores/**"],
  },

  imports: {
    dirs: ["stores"],
  },
  // runtimeConfig: {
  //   apiUrl: process.env.API_URL,
  //   apiKey: process.env.API_KEY,
  // },
  // plugins: [{ src: "~/plugins/solana.ts", mode: "client" }],
  vite: {
    esbuild: {
      target: "esnext",
    },
    build: {
      target: "esnext",
    },
    optimizeDeps: {
      include: ["@project-serum/anchor", "@solana/web3.js", "buffer"],
      esbuildOptions: {
        target: "esnext",
      },
    },
    define: {
      "process.env.BROWSER": true,
    },
  },
  css: [
    "primevue/resources/themes/aura-dark-cyan/theme.css",
    "primeicons/primeicons.css",
    "primevue/resources/primevue.min.css",
    "solana-wallets-vue/styles.css",
    "assets/global.css",
  ],
});
