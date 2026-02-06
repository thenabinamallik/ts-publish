import fs from "node:fs";
import path from "node:path";
import { TSPublishConfig } from "../config/schema.js";
import { TSPublishError } from "../errors/error.js";

export function generatePackageJSON(config: TSPublishConfig) {
  const rootPkgPath = path.resolve("package.json");

  if (!fs.existsSync(rootPkgPath)) {
    throw new TSPublishError(
      "TP040",
      "Root package.json not found."
    );
  }

  const rootPkg = JSON.parse(fs.readFileSync(rootPkgPath, "utf8"));

  if (!rootPkg.name || !rootPkg.version) {
    throw new TSPublishError(
      "TP041",
      "Root package.json must contain name and version."
    );
  }

  const distPkg = {
    name: rootPkg.name,
    version: rootPkg.version,
    type: "module",
    main: "./cjs/index.cjs",
    module: "./esm/index.js",
    types: "./types/index.d.ts",
    sideEffects: false,
    exports: {
      ".": {
        types: "./types/index.d.ts",
        import: "./esm/index.js",
        require: "./cjs/index.cjs"
      }
    }
  };

  const outPath = path.join(config.outDir, "package.json");
  fs.writeFileSync(outPath, JSON.stringify(distPkg, null, 2), "utf8");
}
