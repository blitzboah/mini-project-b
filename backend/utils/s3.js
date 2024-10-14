import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

/**
 * Uploads a file to S3 and returns the URL of the uploaded file
 * @param {Object} file - The file object (from multer) to upload
 * @returns {Promise<string>} - The URL of the uploaded file
 */
const uploadFileToS3 = (file) => {
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: `${Date.now()}_${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if (err) {
        console.error("Error uploading file to S3:", err);
        reject(err);
      } else {
        resolve(data.Location);
      }
    });
  });
};

export { uploadFileToS3 };