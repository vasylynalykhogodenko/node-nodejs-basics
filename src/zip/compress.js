import fs from "fs";
import zlib from "zlib";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const compress = async () => {
  const input = path.join(__dirname, "fileToCompress.txt");
  const output = path.join(__dirname, "archive.gz");

  const readStream = fs.createReadStream(input);
  const writeStream = fs.createWriteStream(output);
  const gzip = zlib.createGzip();

  readStream.pipe(gzip).pipe(writeStream);
};

await compress();
