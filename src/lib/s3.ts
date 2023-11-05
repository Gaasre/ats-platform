import { S3Client } from "@aws-sdk/client-s3";

let S3: S3Client;

if (process.env.NODE_ENV === "production") {
  S3 = new S3Client({
    region: "auto",
    endpoint: `https://${process.env.ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY || "",
      secretAccessKey: process.env.AWS_SECRET || "",
    },
  });
} else {
  if (!global.S3) {
    global.S3 = new S3Client({
      region: "auto",
      endpoint: `https://${process.env.ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY || "",
        secretAccessKey: process.env.AWS_SECRET || "",
      },
    });
  }
  S3 = global.S3;
}

export default S3;
