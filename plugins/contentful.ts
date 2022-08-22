import * as contentful from "contentful";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const client = contentful.createClient({
    space: config.public.contentfulSpace,
    accessToken: config.public.contentfulPublicAccessToken,
  });
  return {
    provide: {
      contentful: client,
    },
  };
});
