import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const copyDir = async (src, dest) => {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
};

export const copy = async () => {
  const srcDir = path.join(__dirname, "files");
  const destDir = path.join(__dirname, "files_copy");

  try {
    await fs.access(srcDir);

    try {
      await fs.access(destDir);
      throw new Error("FS operation failed");
    } catch (err) {
      if (err.code === "ENOENT") {
        await copyDir(srcDir, destDir);
      } else {
        throw new Error("FS operation failed");
      }
    }
  } catch (err) {
    throw new Error("FS operation failed");
  }
};

await copy();
