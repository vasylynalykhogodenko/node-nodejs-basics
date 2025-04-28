import { Worker } from "worker_threads";
import os from "os";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const performCalculations = async () => {
  const numCores = os.cpus().length;
  const workerPath = path.join(__dirname, "worker.js");

  const workerPromises = [];

  for (let i = 0; i < numCores; i++) {
    const workerPromise = new Promise((resolve) => {
      const worker = new Worker(workerPath);
      const dataToSend = 10 + i;

      worker.on("message", (result) => {
        resolve({
          status: "resolved",
          data: result,
        });
        worker.terminate();
      });

      worker.on("error", () => {
        resolve({
          status: "error",
          data: null,
        });
      });

      worker.postMessage(dataToSend);
    });

    workerPromises.push(workerPromise);
  }

  const results = await Promise.all(workerPromises);
  console.log(results);
};

await performCalculations();
