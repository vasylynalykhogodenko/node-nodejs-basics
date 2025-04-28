import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const read = async () => {
  const filePath = path.join(__dirname, "fileToRead.txt");
  const readStream = fs.createReadStream(filePath);

  readStream.on("error", () => {
    throw new Error("FS operation failed");
  });

  readStream.pipe(process.stdout);
};

await read();
