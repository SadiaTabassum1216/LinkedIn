const Minio = require('minio');

function connectToMinio() {
    const minioClient = new Minio.Client({
      endPoint: process.env.MINIO_END_POINT,
      port: parseInt(process.env.MINIO_PORT) || 9000,
      useSSL: false,
      accessKey: process.env.MINIO_ACCESS_KEY,
      secretKey: process.env.MINIO_SECRET_KEY,
    });
  
    return minioClient;
  }

  
  async function createMinioBucket(bucketName) {
    const minioClient = connectToMinio();
  
    try {
      const exists = await minioClient.bucketExists(bucketName);
      if (!exists) {
        await minioClient.makeBucket(bucketName, 'us-east-1');
        console.log('Bucket created successfully.');
      } else {
        console.log('Bucket already exists.');
      }
    } catch (err) {
      console.error('Error creating bucket:', err);
      throw err;
    }
  }

module.exports = {connectToMinio, createMinioBucket};
