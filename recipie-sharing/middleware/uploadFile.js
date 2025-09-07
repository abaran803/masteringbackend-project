const fs = require("fs");
const { Storage } = require("@google-cloud/storage");

const storage = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
  credentials: JSON.parse(process.env.GCP_KEY_JSON),
});

const bucket = storage.bucket(process.env.GCS_BUCKET);

async function uploadFileToGCS(localFilePath, destination) {
  await bucket.upload(localFilePath, {
    destination,
    resumable: true,
    gzip: true,
  });
  return {
    url: `https://storage.googleapis.com/${process.env.GCS_BUCKET}/${destination}`,
    gcsPath: `gs://${process.env.GCS_BUCKET}/${destination}`,
  };
}

const uploadFile = async (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    next();
  } else {
    const results = [];
    for (const file of req.files) {
      const localFilePath = file.path;
      const destination = `recipe-sharing/recipe/photos/${Date.now()}_${
        file.originalname
      }`;

      const { url } = await uploadFileToGCS(localFilePath, destination);
      results.push({ filename: file.originalname, url });
      fs.unlinkSync(localFilePath);
    }
    req.uploadedUrls = results.map((item) => item.url);
    next();
  }
};

module.exports = uploadFile;
