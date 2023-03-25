import * as contentful from "contentful";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const client = contentful.createClient({
    // space: process.env.NUXT_CONTENTFUL_SPACE,
    // accessToken: process.env.NUXT_CONTENTFUL_PUBLIC_ACCESS_TOKEN,
    space: config.public.contentfulSpace,
    accessToken: config.public.contentfulPublicAccessToken,
  });

  return {
    provide: {
      contentful: client,
    },
  };
});
