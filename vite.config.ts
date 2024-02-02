import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { readFileSync } from "fs";
import topLevelAwait from "vite-plugin-top-level-await";

export default defineConfig({
  plugins: [sveltekit(), topLevelAwait({})],
  server: {
    https: {
      cert: readFileSync("cert/localhost.pem"),
      key: readFileSync("cert/localhost-key.pem"),
    },
  },
});
