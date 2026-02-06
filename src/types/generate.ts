import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { TSPublishConfig } from "../config/schema.js";
import { TSPublishError } from "../errors/error.js";

export function generateTypes(config: TSPublishConfig) {
  if (!config.types) return;

  const outDir = path.join(config.outDir, "types");

  fs.mkdirSync(outDir, { recursive: true });

  try {
    execSync(
      [
        "tsc",
        "--emitDeclarationOnly",
        "--declaration",
        "--declarationMap",
        "--project",
        "tsconfig.json",
        "--outDir",
        outDir
      ].join(" "),
      { stdio: "ignore" }
    );
  } catch {
    throw new TSPublishError(
      "TP030",
      "Type generation failed. Fix TypeScript errors."
    );
  }

  const entryDts = path.join(outDir, "src", "index.d.ts");

  if (!fs.existsSync(entryDts)) {
    throw new TSPublishError(
      "TP031",
      "Expected index.d.ts not found after type generation."
    );
  }
  const srcTypes = path.join(outDir, "src", "index.d.ts");
const finalTypes = path.join(outDir, "index.d.ts");

fs.renameSync(srcTypes, finalTypes);
fs.rmSync(path.join(outDir, "src"), { recursive: true, force: true });

}
