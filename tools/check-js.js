const { spawnSync } = require("node:child_process");
const { readdirSync, readFileSync } = require("node:fs");
const { join, extname } = require("node:path");

const root = process.cwd();
const dirs = ["data", "js"];
const jsFiles = dirs.flatMap((dir) => collect(join(root, dir), ".js"));
const jsonFiles = ["package.json", "manifest.webmanifest", "vercel.json"].map((file) => join(root, file));

let failed = false;

for (const file of jsFiles) {
  const result = spawnSync(process.execPath, ["--check", file], { encoding: "utf8" });
  if (result.status !== 0) {
    failed = true;
    console.error(result.stderr || result.stdout);
  }
}

for (const file of jsonFiles) {
  try {
    JSON.parse(readFileSync(file, "utf8"));
  } catch (error) {
    failed = true;
    console.error(`${file}: ${error.message}`);
  }
}

if (failed) {
  process.exit(1);
}

console.log(`Checked ${jsFiles.length} JavaScript files and ${jsonFiles.length} JSON files.`);

function collect(dir, extension) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) return collect(full, extension);
    return extname(entry.name) === extension ? [full] : [];
  });
}
