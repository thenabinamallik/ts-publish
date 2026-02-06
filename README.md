
# ts-publish-helper

Deterministic TypeScript publishing for **ESM**, **CJS**, and **type-safe consumers**.

`ts-publish` exists to solve one problem properly:

> If your package builds successfully with `ts-publish`, it will work in Node (ESM + CJS) and TypeScript consumers — without broken imports or missing types.

This tool is opinionated by design. It favors correctness over flexibility.

---

## Requirements

* **Node.js**: >18
* **TypeScript**: Installed in your project
* Library packages only (not apps)

---

## Installation

Install as a dev dependency:

```bash
npm install --save-dev ts-publish-helper
```

Or use without installing:

```bash
npx ts-publish
```

---

## Quick Start

### 1. Initialize config

From your project root:

```bash
npx ts-publish init
```

This creates:

```json
ts-publish.config.json
```

Default config:

```json
{
  "entry": "src/index.ts",
  "outDir": "dist",
  "formats": ["esm", "cjs"],
  "types": true,
  "sourcemap": true,
  "target": "node18",
  "strict": true
}
```

Do not rename this file.

---

### 2. Build your package

```bash
npx ts-publish build
```

This will:

1. Clean the output directory
2. Build ESM and CJS bundles
3. Generate `.d.ts` files
4. Generate a production `package.json` with correct exports

Output structure:

```
dist/
├── esm/index.js
├── cjs/index.cjs
├── types/index.d.ts
└── package.json
```

If any step fails, the build fails. No partial output.

---

### 3. Verify (coming next)

```bash
npx ts-publish verify
```

This will simulate real consumers (ESM, CJS, TypeScript) and fail if imports or types break.

---

## Configuration

All configuration lives in `ts-publish.config.json`.

### Options

| Field       | Type                 | Description                      |
| ----------- | -------------------- | -------------------------------- |
| `entry`     | `string`             | Entry file for your library      |
| `outDir`    | `string`             | Output directory                 |
| `formats`   | `("esm" \| "cjs")[]` | Module formats to build          |
| `types`     | `boolean`            | Generate `.d.ts` files           |
| `sourcemap` | `boolean`            | Emit source maps                 |
| `target`    | `string`             | Node target (`node18`, `node20`) |
| `strict`    | `boolean`            | Enforce strict type generation   |

Invalid config fails fast with clear error codes.

---

## Generated `package.json`

`ts-publish` **owns** the published `package.json`.

Example:

```json
{
  "type": "module",
  "main": "./cjs/index.cjs",
  "module": "./esm/index.js",
  "types": "./types/index.d.ts",
  "exports": {
    ".": {
      "types": "./types/index.d.ts",
      "import": "./esm/index.js",
      "require": "./cjs/index.cjs"
    }
  }
}
```

This prevents:

* dual-package hazards
* broken default imports
* missing type resolution
* runtime vs type mismatches

---

## What ts-publish Does NOT Do

By design, v1 does **not** support:

* React / Vue / browser bundling
* CSS or asset pipelines
* Monorepos
* Native addons
* Custom bundler plugins

If you need those, this tool is not for you (yet).

---

## Error Handling

All failures are explicit and actionable.

Example:

```
TP030: Type generation failed. Fix TypeScript errors.
```

No silent failures. No ignored warnings.

---

## Typical Workflow

```bash
# once
npx ts-publish init

# every release
npx ts-publish build
npm publish dist
```

Yes — you publish **from `dist/`**.

---

## Status

* Pre-alpha
* APIs may change
* Focused on correctness first

---

## Philosophy

Most publishing tools optimize for convenience.
`ts-publish` optimizes for **truth**.

If your library builds here, your users won’t suffer.

---
