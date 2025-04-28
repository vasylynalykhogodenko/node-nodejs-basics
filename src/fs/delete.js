import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const remove = async () => {
  const filePath = path.join(__dirname, "fileToRemove.txt");

  try {
    await fs.access(filePath);
    await fs.unlink(filePath);
  } catch (err) {
    throw new Error("FS operation failed");
  }
};

await remove();
