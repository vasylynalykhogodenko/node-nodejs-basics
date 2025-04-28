import { parentPort } from "worker_threads";

// n should be received from main thread
const nthFibonacci = (n) =>
  n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

export const sendResult = () => {
  // This function sends result of nthFibonacci computations to main thread
  parentPort.on("message", (message) => {
    try {
      const result = message * 2;
      parentPort.postMessage(result);
    } catch (error) {
      parentPort.postMessage(null);
    }
  });
};

sendResult();
