import { Queue, RedisConnection } from "bullmq";

if (!global.redisConnection) {
  global.redisConnection = new RedisConnection({
    host: "localhost",
    port: 6379,
  });
}

export let parsingQueue: Queue;
export let actionQueue: Queue;
export let invitationQueue: Queue;

if (!global.parsingQueue) {
  global.parsingQueue = new Queue("parsingQueue", {
    connection: global.redisConnection,
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
    connection: global.redisConnection,
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

if (!global.invitationQueue) {
  global.invitationQueue = new Queue("invitationQueue", {
    connection: global.redisConnection,
    defaultJobOptions: {
      attempts: 3,
      backoff: {
        type: "exponential",
        delay: 3000,
      },
    },
  });
}
invitationQueue = global.invitationQueue;
