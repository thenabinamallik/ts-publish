#!/usr/bin/env node

import { assertSupportedNode } from "../src/utils/node.js";
import { runCLI } from "../src/cli/index.js";

assertSupportedNode();

await runCLI(process.argv.slice(2));

