import fs from "node:fs";
import path from "node:path";
import { DEFAULT_CONFIG } from "./schema.js";
import { TSPublishError } from "../errors/error.js";
const CONFIG_FILE = "ts-publish.config.json";
export function initConfig(cwd = process.cwd()) {
    const filePath = path.join(cwd, CONFIG_FILE);
    if (fs.existsSync(filePath)) {
        throw new TSPublishError("TP011", `${CONFIG_FILE} already exists. Refusing to overwrite.`);
    }
    fs.writeFileSync(filePath, JSON.stringify(DEFAULT_CONFIG, null, 2), "utf8");
}
