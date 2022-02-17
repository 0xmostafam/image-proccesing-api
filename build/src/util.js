"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.manipulateImage = exports.checkFileExists = void 0;
const fs_1 = require("fs");
const fs_2 = require("fs");
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const checkFileExists = (imagePath) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      yield fs_1.promises.access(imagePath, fs_2.constants.F_OK);
      return true;
    } catch (e) {
      return false;
    }
  });
exports.checkFileExists = checkFileExists;
// resize logic
const resizeImage = (imagePath, imageHeight, imageWidth, newImagePath) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      yield (0, sharp_1.default)(imagePath)
        .resize({ height: imageHeight, width: imageWidth })
        .toFormat("jpg")
        .toFile(newImagePath);
    } catch (e) {
      console.log(e);
    }
  });
// main manipulation function incase i wanted to add more features
const manipulateImage = (imagePath, imageHeight, imageWidth) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const imageName = path_1.default.basename(imagePath).split(".")[0];
    const newImagePath = path_1.default.resolve(
      `thumbs/${imageName}_thumb_${imageWidth}_${imageHeight}.jpg`
    );
    // check if image is already processed
    if (yield (0, exports.checkFileExists)(newImagePath)) {
      return newImagePath;
    }
    resizeImage(imagePath, imageHeight, imageWidth, newImagePath);
    return newImagePath;
  });
exports.manipulateImage = manipulateImage;
