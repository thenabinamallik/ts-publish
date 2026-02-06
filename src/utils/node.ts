export function assertSupportedNode() {
  const major = Number(process.versions.node.split(".")[0]);

  if (major < 18) {
    console.error(
      `ts-publish requires Node.js >= 18. Detected ${process.versions.node}`
    );
    process.exit(1);
  }
}
