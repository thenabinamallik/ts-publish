#!/usr/bin/env node

import { assertSupportedNode } from "../src/utils/node.js";
import { runCLI } from "../src/cli/index.js";

assertSupportedNode();

runCLI(process.argv.slice(2));
