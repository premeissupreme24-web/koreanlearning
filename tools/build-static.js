const { copyFileSync, cpSync, mkdirSync, rmSync } = require("node:fs");
const { join } = require("node:path");

const root = join(__dirname, "..");
const outDir = join(root, "public");
const assetDirs = ["css", "data", "icons", "js"];
const rootFiles = ["index.html", "manifest.webmanifest", "service-worker.js"];

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

for (const dir of assetDirs) {
  cpSync(join(root, dir), join(outDir, dir), { recursive: true });
}

for (const file of rootFiles) {
  copyFileSync(join(root, file), join(outDir, file));
}

console.log(`Static site built into ${outDir}`);
