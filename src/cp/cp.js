import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const spawnChildProcess = async (args) => {
  const scriptPath = path.join(__dirname, "script.js");

  const child = spawn("node", [scriptPath, ...args], {
    stdio: ["inherit", "pipe", "inherit"],
  });

  child.stdout.pipe(process.stdout);

  return child;
};

// Put your arguments in function call to test this functionality
spawnChildProcess(["--hello", "world", "--foo", "bar"]);
