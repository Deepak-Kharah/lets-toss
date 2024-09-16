import { partytownVite } from "@builder.io/partytown/utils";
import { join } from "path";
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

export default defineConfig({
  plugins: [
    solid(),
    partytownVite({
      dest: join(__dirname, "dist", "~partytown"),
    }),
  ],
});
