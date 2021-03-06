"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkParameters = exports.manipulateImage = exports.resizeImage = exports.createDirectory = exports.checkFileExists = void 0;
const fs_1 = require("fs");
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const checkFileExists = (filePath) => {
    try {
        if ((0, fs_1.existsSync)(filePath))
            return true;
        return false;
    }
    catch (e) {
        console.log(e);
    }
};
exports.checkFileExists = checkFileExists;
// is used to create thumbs folder but if it was already created the function is skiped
const createDirectory = (dirPath) => {
    if ((0, exports.checkFileExists)(dirPath))
        return;
    (0, fs_1.mkdir)(dirPath, (err) => {
        if (err)
            console.log(err);
    });
};
exports.createDirectory = createDirectory;
// resize logic
const resizeImage = async (imagePath, imageHeight, imageWidth, newImagePath) => {
    try {
        await (0, sharp_1.default)(imagePath)
            .resize({ height: imageHeight, width: imageWidth })
            .toFormat("jpg")
            .toFile(newImagePath);
    }
    catch (e) {
        console.log(e);
    }
};
exports.resizeImage = resizeImage;
// main manipulation function incase i wanted to add more features
const manipulateImage = async (imagePath, imageHeight, imageWidth) => {
    (0, exports.createDirectory)(path_1.default.resolve("thumbs"));
    const imageName = path_1.default.basename(imagePath).split(".")[0];
    const newImagePath = path_1.default.resolve(`thumbs/${imageName}_thumb_${imageWidth}_${imageHeight}.jpg`);
    // check if image is already processed
    if ((0, exports.checkFileExists)(newImagePath)) {
        return newImagePath;
    }
    await (0, exports.resizeImage)(imagePath, imageHeight, imageWidth, newImagePath);
    return newImagePath;
};
exports.manipulateImage = manipulateImage;
const checkParameters = (width, height) => {
    if (isNaN(parseInt(width)) && isNaN(parseInt(height))) {
        return [false, "invalid width and height parameters"];
    }
    else if (isNaN(parseInt(width))) {
        return [false, "invalid width parameter"];
    }
    else if (isNaN(parseInt(height))) {
        return [false, "invalid height parameter"];
    }
    else if (parseInt(width) < 0) {
        return [false, "width must be greater than 0"];
    }
    else if (parseInt(height) < 0) {
        return [false, "height must be greater than 0"];
    }
    else {
        return [true];
    }
};
exports.checkParameters = checkParameters;
