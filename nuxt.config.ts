import { defineNuxtConfig } from "nuxt";

requireEnvVars();

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: ["@/assets/main.css", "@formkit/themes/genesis"],
  autoImports: {
    dirs: ["stores"],
  },
  modules: [
    "@formkit/nuxt",
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", "acceptHMRUpdate"],
      },
    ],
  ],
  runtimeConfig: {
    stripeSecret: process.env.STRIPE_SECRET,
    public: {
      contentfulSpace: "v7fvzlkum53d",
      contentfulPublicAccessToken:
        "dG3pVWxjHUEzLX0Xga4muaYMPWj0wEQ74RVKzZbMRX8",
      deskreeBaseUrl: process.env.NUXT_DESKREE_BASE_URL,
    },
  },
  build: {
    transpile:
      process.env.npm_lifecycle_script === "nuxt generate"
        ? ["contentful"]
        : [],
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },
});

function requireEnvVars() {
  const map = {
    "Deskree Project URL": process.env.NUXT_DESKREE_BASE_URL,
    "Stripe secret token": process.env.STRIPE_SECRET,
  };
  let ready = true;
  for (const label in map) {
    if (!map[label]) {
      ready = false;
      console.error(
        `You must provide a ${label} in .env to start the project (see the Setup Guide for more instructions: https://vueschool.notion.site/Preparation-Guide-cf256a7352704d27bb7946c47907d40e)`
      );
    }
  }

  if (!ready) process.exit();
}
