const { Storage } = require('@google-cloud/storage');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const storage = new Storage({
  projectId: process.env.GCS_PROJECT_ID,
  keyFilename: process.env.GCS_KEY_FILE
});
const bucketName = process.env.GCS_BUCKET_NAME;

function getMimeType(filename) {
  if (filename.endsWith('.png')) return 'image/png';
  if (filename.endsWith('.jpg') || filename.endsWith('.jpeg')) return 'image/jpeg';
  return 'application/octet-stream';
}

async function uploadImage(buffer, filename) {
  const uniqueName = `${uuidv4()}-${filename}`;
  const bucket = storage.bucket(bucketName);
  const file = bucket.file(uniqueName);

  await file.save(buffer, {
    resumable: false,
    contentType: getMimeType(filename),
    metadata: {
      cacheControl: 'public, max-age=31536000'
    }
  });

  return `https://storage.googleapis.com/${bucketName}/${uniqueName}`;
}

module.exports = { uploadImage };