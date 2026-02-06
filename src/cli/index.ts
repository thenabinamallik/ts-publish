import chalk from "chalk";
import { initConfig } from "../config/init.js";
import { loadConfig } from "../config/load.js";
import { TSPublishError } from "../errors/error.js";

export function runCLI(args: string[]) {
  const command = args[0];

  try {
    switch (command) {
      case "init":
        initConfig();
        console.log(chalk.green("ts-publish.config.json created"));
        break;

      case "build":
        const config = loadConfig();
        console.log(chalk.blue("Config loaded:"), config);
        break;

      case "verify":
        loadConfig();
        console.log(chalk.yellow("Verification not implemented yet"));
        break;

      default:
        printHelp();
        process.exit(command ? 1 : 0);
    }
  } catch (err) {
    handleError(err);
  }
}

function handleError(err: unknown) {
  if (err instanceof TSPublishError) {
    console.error(chalk.red(err.format()));
  } else {
    console.error(err);
  }
  process.exit(1);
}

function printHelp() {
  console.log(`
ts-publish — deterministic TypeScript publishing

Usage:
  ts-publish init
  ts-publish build
  ts-publish verify
`);
}
