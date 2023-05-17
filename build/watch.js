const esbuild = require("esbuild");
const path = require("path");

esbuild
  .context({
    logLevel: "info",
    bundle: true,
    entryPoints: [path.join(__dirname, "../src", "index.ts")],
    outfile: path.join(__dirname, "../dist", "index.js"),
    platform: "node",
    external: ["esbuild"],
  })
  .then((ctx) => {
    ctx.watch();
  });
