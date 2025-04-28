import path from "path";
import { readFile } from "fs/promises";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const print = async () => {
  const filePath = path.join(__dirname, "files", "fileToRead.txt");
  try {
    const content = await readFile(filePath, { encoding: "utf8" });
    console.log(content);
  } catch (error) {
    console.error(`Error reading file: ${error.message}`);
  }
};

export { print };
