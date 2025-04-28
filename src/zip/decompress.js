import fs from "fs";
import zlib from "zlib";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const decompress = async () => {
  const input = path.join(__dirname, "archive.gz");
  const output = path.join(__dirname, "fileToCompress.txt");

  const readStream = fs.createReadStream(input);
  const writeStream = fs.createWriteStream(output);
  const gunzip = zlib.createGunzip();

  readStream.pipe(gunzip).pipe(writeStream);
};

await decompress();
