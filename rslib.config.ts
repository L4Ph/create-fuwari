import { defineConfig } from "@rslib/core";

export default defineConfig({
  lib: [
    {
      format: "esm",
      syntax: "esnext",
      bundle: true,
      autoExtension: true,
      dts: true,
    },
  ],
  output: {
    target: "node",
  },
  source: {
    entry: {
      index: "./src/index.ts",
    },
  },
});
