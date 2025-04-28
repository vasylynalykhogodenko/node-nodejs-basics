import fs from "fs";
import crypto from "crypto";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const calculateHash = async () => {
  const filePath = path.join(__dirname, "fileToCalculateHashFor.txt");
  const hash = crypto.createHash("sha256");

  const readStream = fs.createReadStream(filePath);

  readStream.on("error", (error) => {
    console.error("Error reading file:", error);
  });

  readStream.on("data", (chunk) => {
    hash.update(chunk);
  });

  readStream.on("end", () => {
    console.log(hash.digest("hex"));
  });
};

await calculateHash();
