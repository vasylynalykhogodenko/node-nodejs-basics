import { Transform } from "stream";

export const transform = async () => {
  const reverseTransform = new Transform({
    transform(chunk, encoding, callback) {
      const reversed = chunk.toString().split("").reverse().join("");
      this.push(reversed);
      callback();
    },
  });

  process.stdin.pipe(reverseTransform).pipe(process.stdout);
};

await transform();
