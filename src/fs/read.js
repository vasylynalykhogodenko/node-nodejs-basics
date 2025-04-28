import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const read = async () => {
  const filePath = path.join(__dirname, "fileToRead.txt");

  try {
    const content = await fs.readFile(filePath, "utf8");
    console.log(content);
  } catch (err) {
    throw new Error("FS operation failed");
  }
};

await read();
