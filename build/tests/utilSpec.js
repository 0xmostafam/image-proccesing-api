"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../util");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
describe("Test checkFileExists Function", () => {
    it("Testing a valid image.", () => {
        const imagePath = path_1.default.resolve("Images/fjord.jpg");
        const result = (0, util_1.checkFileExists)(imagePath);
        expect(result).toEqual(true);
    });
    it("Testing an invalid image.", () => {
        const imagePath = path_1.default.resolve("Images/invalidimage.jpg");
        const result = (0, util_1.checkFileExists)(imagePath);
        expect(result).toEqual(false);
    });
});
describe("Test checkParameters Function", () => {
    it("Testing a valid parameters.", () => {
        const result = (0, util_1.checkParameters)("200", "200");
        expect(result[0]).toEqual(true);
    });
    it("Testing an invalid width parameter.", () => {
        const result = (0, util_1.checkParameters)("invalid", "200");
        expect(result[0]).toEqual(false);
        expect(result[1]).toEqual("invalid width parameter");
    });
    it("Testing an invalid height parameter.", () => {
        const result = (0, util_1.checkParameters)("200", "invalid");
        expect(result[0]).toEqual(false);
        expect(result[1]).toEqual("invalid height parameter");
    });
    it("Testing an invalid width and height parameter.", () => {
        const result = (0, util_1.checkParameters)("invalid", "invalid");
        expect(result[0]).toEqual(false);
        expect(result[1]).toEqual("invalid width and height parameters");
    });
});
describe("Test manipulateImage and resizeImage Functions", () => {
    it("Testing if it will result in a new resized image.", async () => {
        const newPath = await (0, util_1.manipulateImage)(path_1.default.resolve("Images/fjord.jpg"), 200, 200);
        const result = (0, util_1.checkFileExists)(path_1.default.resolve("thumbs/fjord_thumb_200_200.jpg"));
        expect(result).toEqual(true);
    });
    afterAll(() => {
        fs_1.default.rmdir(path_1.default.resolve("thumbs"), {
            recursive: true,
        }, (error) => {
            if (error) {
                console.log(error);
            }
        });
    });
});
