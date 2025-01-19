import { defineConfig } from "@rslib/core";

export default defineConfig({
  lib: [
    {
      format: "esm",
      syntax: 'es2024',
      bundle: true,
      dts: true
    }
  ],
  output: {
    target: "node",
  }
});
