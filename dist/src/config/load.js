import fs from "node:fs";
import path from "node:path";
import { TSPublishError } from "../errors/error.js";
import { DEFAULT_CONFIG } from "./schema.js";
const CONFIG_FILE = "ts-publish.config.json";
export function loadConfig(cwd = process.cwd()) {
    const configPath = path.join(cwd, CONFIG_FILE);
    if (!fs.existsSync(configPath)) {
        throw new TSPublishError("TP001", `Missing ${CONFIG_FILE}. Run "ts-publish init" first.`);
    }
    let raw;
    try {
        raw = JSON.parse(fs.readFileSync(configPath, "utf8"));
    }
    catch {
        throw new TSPublishError("TP002", "Config file is not valid JSON.");
    }
    return validateConfig(raw);
}
function validateConfig(raw) {
    if (typeof raw !== "object" || raw === null) {
        throw new TSPublishError("TP003", "Config must be a JSON object.");
    }
    const config = { ...DEFAULT_CONFIG, ...raw };
    if (typeof config.entry !== "string") {
        throw new TSPublishError("TP004", "`entry` must be a string.");
    }
    if (typeof config.outDir !== "string") {
        throw new TSPublishError("TP005", "`outDir` must be a string.");
    }
    if (!Array.isArray(config.formats) ||
        config.formats.some(f => f !== "esm" && f !== "cjs")) {
        throw new TSPublishError("TP006", "`formats` must be an array containing 'esm' and/or 'cjs'.");
    }
    if (typeof config.types !== "boolean") {
        throw new TSPublishError("TP007", "`types` must be boolean.");
    }
    if (typeof config.sourcemap !== "boolean") {
        throw new TSPublishError("TP008", "`sourcemap` must be boolean.");
    }
    if (typeof config.target !== "string") {
        throw new TSPublishError("TP009", "`target` must be a string.");
    }
    if (typeof config.strict !== "boolean") {
        throw new TSPublishError("TP010", "`strict` must be boolean.");
    }
    return config;
}
