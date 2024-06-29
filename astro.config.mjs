import { defineConfig, passthroughImageService } from "astro/config";
import { astroImageTools } from "astro-imagetools";
import tailwind from "@astrojs/tailwind";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), icon(), astroImageTools],
  prefetch: {
    prefetchAll: true,
  },
  image: {
    service: passthroughImageService(),
  },
});
