"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../util");
const path_1 = __importDefault(require("path"));
describe("Test async checkFileExists Function", () => {
    it("Testing a valid image.", async () => {
        const imagePath = path_1.default.resolve("Images/fjord.jpg");
        const result = await (0, util_1.checkFileExists)(imagePath);
        expect(result).toEqual(true);
    });
    it("Testing an invalid image.", async () => {
        const imagePath = path_1.default.resolve("Images/invalidimage.jpg");
        const result = await (0, util_1.checkFileExists)(imagePath);
        expect(result).toEqual(false);
    });
});
