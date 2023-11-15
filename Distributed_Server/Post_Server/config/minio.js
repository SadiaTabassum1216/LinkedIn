const Minio = require("minio");

function connectToMinio() {
  const minioClient = new Minio.Client({
    endPoint: "host.docker.internal",
    port: parseInt(process.env.MINIO_PORT) || 9000,
    useSSL: false,
    accessKey: "TJSMINojolVyUzZ5SkPY",
    secretKey: "QQ8do1NdUR2ZB5I8R35X3G6Eukp5ffzDclZ0rksu",
  });

  return minioClient;
}

async function createMinioBucket(bucketName) {
  const minioClient = connectToMinio();

  try {
    const exists = await minioClient.bucketExists(bucketName);
    if (!exists) {
      await minioClient.makeBucket(bucketName, "us-east-1");
      console.log("Bucket created successfully.");
    } else {
      console.log("Bucket already exists.");
    }
  } catch (err) {
    console.error("Error creating bucket:", err);
    throw err;
  }
}

module.exports = { connectToMinio, createMinioBucket };
