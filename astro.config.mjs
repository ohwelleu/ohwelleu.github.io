// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://ohwelleu.github.io",
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      theme: "vesper",
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
