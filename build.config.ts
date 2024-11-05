import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: ["./src/index"],
  declaration: true,
  failOnWarn: false,
  rollup: {
    esbuild: {
      target: "esnext",
      minify: true,
    },
  },
});
