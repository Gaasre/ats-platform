import { Queue } from "bullmq";

let parsingQueue: Queue;

if (!global.parsingQueue) {
  global.parsingQueue = new Queue("parsingQueue", {
    defaultJobOptions: {
      attempts: 3,
      backoff: {
        type: "exponential",
        delay: 3000,
      },
    },
  });
}
parsingQueue = global.parsingQueue;

export default parsingQueue;
