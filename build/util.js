"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.manipulateImage = exports.checkImageExists = void 0;
const fs_1 = require("fs");
const fs_2 = require("fs");
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const checkImageExists = async (imagePath) => {
    try {
        await fs_1.promises.access(imagePath, fs_2.constants.F_OK);
        return true;
    }
    catch (e) {
        return false;
    }
};
exports.checkImageExists = checkImageExists;
// resize logic
const resizeImage = async (imagePath, imageHeight, imageWidth, newImagePath) => {
    try {
        await (0, sharp_1.default)(imagePath)
            .resize({ height: imageHeight, width: imageWidth })
            .toFormat('jpg')
            .toFile(newImagePath);
    }
    catch (e) {
        console.log(e);
    }
};
// main manipulation function incase i wanted to add more features
const manipulateImage = async (imagePath, imageHeight, imageWidth) => {
    const imageName = path_1.default.basename(imagePath).split('.')[0];
    const newImagePath = path_1.default.resolve(`thumbs/${imageName}_thumb_${imageWidth}_${imageHeight}.jpg`);
    // check if image is already processed
    if (await (0, exports.checkImageExists)(newImagePath)) {
        return newImagePath;
    }
    resizeImage(imagePath, imageHeight, imageWidth, newImagePath);
    return newImagePath;
};
exports.manipulateImage = manipulateImage;