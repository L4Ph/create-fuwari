import { defineConfig } from "@rslib/core";
import { pluginTypeCheck } from "@rsbuild/plugin-type-check";

export default defineConfig({
  plugins: [pluginTypeCheck()],
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
