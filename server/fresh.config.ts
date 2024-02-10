import { defineConfig } from "$fresh/server.ts";
import twindPlugin from "$fresh/plugins/twind.ts";
import twindConfig from "./twind.config.ts";

export const worker = new Worker(
  new URL("./lib/worker/pinger.ts", import.meta.url).href,
  {
    type: "module",
  },
);

worker.postMessage("start");

export default defineConfig({
  plugins: [twindPlugin(twindConfig)],
});
