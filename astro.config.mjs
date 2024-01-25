import { defineConfig, passthroughImageService } from "astro/config";
import { defineConfig, passthroughImageService } from "astro/config";
import tailwind from "@astrojs/tailwind";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), icon()],
  prefetch: {
    prefetchAll: true,
  },
  image: {
    service: passthroughImageService(),
  },
});
