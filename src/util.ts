import { existsSync } from "fs";
import sharp from "sharp";
import path from "path";

export const checkImageExists = (imagePath: string) => {
  try {
    if (existsSync(imagePath)) return true;
    return false;
  } catch (e) {
    console.log(e);
  }
};

// resize logic
const resizeImage = async (
  imagePath: string,
  imageHeight: number,
  imageWidth: number,
  newImagePath: string
) => {
  try {
    await sharp(imagePath)
      .resize({ height: imageHeight, width: imageWidth })
      .toFormat("jpg")
      .toFile(newImagePath);
  } catch (e) {
    console.log(e);
  }
};

// main manipulation function incase i wanted to add more features
export const manipulateImage = async (
  imagePath: string,
  imageHeight: number,
  imageWidth: number
) => {
  const imageName = path.basename(imagePath).split(".")[0];
  const newImagePath = path.resolve(
    `thumbs/${imageName}_thumb_${imageWidth}_${imageHeight}.jpg`
  );
  // check if image is already processed
  if (checkImageExists(newImagePath)) {
    return newImagePath;
  }
  await resizeImage(imagePath, imageHeight, imageWidth, newImagePath);
  return newImagePath;
};
