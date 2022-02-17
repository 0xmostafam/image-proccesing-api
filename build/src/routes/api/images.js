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
const express_1 = __importDefault(require("express"));
const util_1 = require("../../util");
const path_1 = __importDefault(require("path"));
const imageDirPath = path_1.default.resolve("Images");
const imagesRoute = express_1.default.Router();
imagesRoute.get("/", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // Check if image is specified
    if (!req.query.imageName) {
      res.status(400);
      res.send("missing parameter imageName");
    }
    let imagePath = path_1.default.join(imageDirPath, req.query.imageName);
    // Check if the image does exist
    if (yield (0, util_1.checkFileExists)(imagePath)) {
      // Check if we have height and width parameters
      // if yes we call the manipulationImage function to resize it and recieve the path of the new image
      // if no we show the user the normal image
      if (req.query.height && req.query.width) {
        imagePath = yield (0, util_1.manipulateImage)(
          imagePath,
          parseInt(req.query.height),
          parseInt(req.query.width)
        );
      }
      res.status(200);
      res.sendFile(imagePath);
    } else {
      res.status(400);
      res.send("Image not found");
    }
  })
);
exports.default = imagesRoute;
