import AWS from "aws-sdk";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const bucketName = process.env.AWS_BUCKET_NAME;

const bucketRegion = process.env.AWS_BUCKET_REGION;

const bucketAccessKey = process.env.AWS_ACCESS_KEY_ID;

const bucketSecretKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new AWS.S3({
  bucketRegion,
  bucketAccessKey,
  bucketSecretKey,
});

// Upload a file
const uploadFiles = (file) => {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
  };

  return s3.upload(uploadParams).promise();
};

// Get a file
const getFileStream = (fileKey) => {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
  };

  return s3
    .getObject(downloadParams)
    .createReadStream()
    .on("error", () => console.log("Fichier introuvable"));
};

// Delete a file
const deleteFiles = (fileKey) => {
  var params = {
    Bucket: bucketName,
    Key: fileKey,
    /* 
     where value for 'Key' equals 'pathName1/pathName2/.../pathNameN/fileName.ext'
     - full path name to your file without '/' at the beginning
  */
  };

  s3.deleteObject(params, function (err, data) {
    if (err) console.log(err, err.stack);
    // an error occurred
    else console.log("File deleted."); // successful response
  });
};

export { uploadFiles, getFileStream, deleteFiles };
