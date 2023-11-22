import { Queue } from "bullmq";

export let parsingQueue: Queue;
export let actionQueue: Queue;

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

if (!global.actionQueue) {
  global.actionQueue = new Queue("actionQueue", {
    defaultJobOptions: {
      attempts: 3,
      backoff: {
        type: "exponential",
        delay: 3000,
      },
    },
  });
}
actionQueue = global.actionQueue;
