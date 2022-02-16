import { promises as fsPromises } from 'fs';
import { constants } from 'fs';
import sharp from 'sharp';
import path from 'path';

export const checkImageExists = async (imagePath: string): Promise<boolean> => {
	try {
		await fsPromises.access(imagePath, constants.F_OK);
		return true;
	} catch (e) {
		return false;
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
			.toFormat('jpg')
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
	const imageName = path.basename(imagePath).split('.')[0];
	const newImagePath = path.resolve(
		`thumbs/${imageName}_thumb_${imageWidth}_${imageHeight}.jpg`
	);
	// check if image is already processed
	if (await checkImageExists(newImagePath)) {
		return newImagePath;
	}
	resizeImage(imagePath, imageHeight, imageWidth, newImagePath);
	return newImagePath;
};
