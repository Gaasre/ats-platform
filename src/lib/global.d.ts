import { S3Client } from "@aws-sdk/client-s3";
import { PrismaClient } from "@prisma/client";
import { Queue } from "bullmq";

declare global {
  var prisma: PrismaClient;
  var S3: S3Client;
  var parsingQueue: Queue;
  var actionQueue: Queue;
}
