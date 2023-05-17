const esbuild = require("esbuild");
const path = require("path");

esbuild.build({
  bundle: true,
  entryPoints: [path.join(__dirname, "../src", "index.ts")],
  outfile: path.join(__dirname, "../dist", "index.js"),
  platform: "node",
  external: ["esbuild"],
  logLevel: "info",
});

esbuild.build({
  bundle: true,
  entryPoints: [path.join(__dirname, "../src", "index.ts")],
  outfile: path.join(__dirname, "../dist", "index.min.js"),
  platform: "node",
  external: ["esbuild"],
  minify: true,
  logLevel: "info",
});
