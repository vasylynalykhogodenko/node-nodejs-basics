import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const rename = async () => {
  const oldPath = path.join(__dirname, "wrongFilename.txt");
  const newPath = path.join(__dirname, "properFilename.md");

  try {
    await fs.access(oldPath);

    try {
      await fs.access(newPath);
      throw new Error("FS operation failed");
    } catch (err) {
      if (err.code === "ENOENT") {
        await fs.rename(oldPath, newPath);
      } else {
        throw new Error("FS operation failed");
      }
    }
  } catch (err) {
    throw new Error("FS operation failed");
  }
};

await rename();
