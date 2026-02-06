export type ModuleFormat = "esm" | "cjs";

export interface TSPublishConfig {
  entry: string;
  outDir: string;
  formats: ModuleFormat[];
  types: boolean;
  sourcemap: boolean;
  target: string;
  strict: boolean;
}

export const DEFAULT_CONFIG: TSPublishConfig = {
  entry: "src/index.ts",
  outDir: "dist",
  formats: ["esm", "cjs"],
  types: true,
  sourcemap: true,
  target: "node18",
  strict: true
};
