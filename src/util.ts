import { existsSync, fstat, mkdir } from "fs";
import sharp from "sharp";
import path from "path";

export const checkFileExists = (filePath: string) => {
  try {
    if (existsSync(filePath)) return true;
    return false;
  } catch (e) {
    console.log(e);
  }
};

// is used to create thumbs folder but if it was already created the function is skiped
export const createDirectory = (dirPath: string) => {
  if (checkFileExists(dirPath)) return;
  mkdir(dirPath, (err) => {
    if (err) console.log(err);
  });
};
// resize logic
export const resizeImage = async (
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
  createDirectory(path.resolve("thumbs"));
  const imageName = path.basename(imagePath).split(".")[0];
  const newImagePath = path.resolve(
    `thumbs/${imageName}_thumb_${imageWidth}_${imageHeight}.jpg`
  );
  // check if image is already processed
  if (checkFileExists(newImagePath)) {
    return newImagePath;
  }
  await resizeImage(imagePath, imageHeight, imageWidth, newImagePath);
  return newImagePath;
};

export const checkParameters = (width: string, height: string) => {
  if (isNaN(parseInt(width)) && isNaN(parseInt(height))) {
    return [false, "invalid width and height parameters"];
  } else if (isNaN(parseInt(width))) {
    return [false, "invalid width parameter"];
  } else if (isNaN(parseInt(height))) {
    return [false, "invalid height parameter"];
  } else if (parseInt(width) < 0) {
    return [false, "width must be greater than 0"];
  } else if (parseInt(height) < 0) {
    return [false, "height must be greater than 0"];
  } else {
    return [true];
  }
};
