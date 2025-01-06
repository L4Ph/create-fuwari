import { defineConfig } from "@rslib/core";

export default defineConfig({
  lib: [
    {
      format: "esm",
      syntax: "esnext",
      bundle: true,
    }
  ],
  output: {
    target: "node",
  },
  source: {
    entry: {
      index: './src/index.ts',
    },
  },
});
