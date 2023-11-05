import { S3Client } from "@aws-sdk/client-s3";
import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient;
  var S3: S3Client;
}
