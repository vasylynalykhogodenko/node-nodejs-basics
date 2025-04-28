import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const list = async () => {
  const dirPath = path.join(__dirname, "files");

  try {
    const files = await fs.readdir(dirPath);
    console.log(files);
  } catch (err) {
    throw new Error("FS operation failed");
  }
};

await list();
