"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const util_1 = require("../../util");
const path_1 = __importDefault(require("path"));
const imageDirPath = path_1.default.resolve("Images");
const imagesRoute = express_1.default.Router();
imagesRoute.get("/", async (req, res) => {
    // Check if image is specified
    if (!req.query.imageName) {
        res.status(400);
        res.send("missing parameter imageName");
        return;
    }
    let imagePath = path_1.default.join(imageDirPath, req.query.imageName);
    const imageExists = (0, util_1.checkFileExists)(imagePath);
    // Check if the image does exist
    if (imageExists) {
        // Check if we have height and width parameters
        // if yes we call the manipulationImage function to resize it and recieve the path of the new image
        // if no we show the user the normal image
        if (req.query.height && req.query.width) {
            const result = (0, util_1.checkParameters)(req.query.width, req.query.height);
            if (!result[0]) {
                res.status(400);
                res.send(result[1]);
            }
            imagePath = await (0, util_1.manipulateImage)(imagePath, parseInt(req.query.height), parseInt(req.query.width));
        }
        res.status(200);
        res.sendFile(imagePath);
    }
    else {
        res.status(400);
        res.send("Image not found");
    }
});
exports.default = imagesRoute;
