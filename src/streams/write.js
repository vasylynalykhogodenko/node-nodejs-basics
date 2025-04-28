import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const write = async () => {
  const filePath = path.join(__dirname, "fileToWrite.txt");
  const writeStream = fs.createWriteStream(filePath);

  writeStream.on("error", () => {
    throw new Error("FS operation failed");
  });

  process.stdin.pipe(writeStream);
};

await write();
