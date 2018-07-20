const cloudinary = require("cloudinary");

async function uploadImage(base64Image) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(base64Image, function callback(result, error) {
      if (error) {
        console.error(
          "Something went wrong uploading the image to cloudinary",
          error
        );
        reject(error);
      }

      resolve(result);
    });
  });
}

module.exports = uploadImage;
