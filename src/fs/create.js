import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const create = async () => {
  const filePath = path.join(__dirname, "files", "fresh.txt");

  try {
    await fs
      .access(filePath)
      .then(() => {
        throw new Error("FS operation failed");
      })
      .catch(async (err) => {
        if (err.code === "ENOENT") {
          await fs.writeFile(filePath, "I am fresh and young");
        } else {
          throw new Error("FS operation failed");
        }
      });
  } catch (error) {
    throw new Error("FS operation failed");
  }
};

await create();
