"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const request = (0, supertest_1.default)(index_1.default);
describe("Test routes endpoint response", () => {
    it("Test the api endpoint response code", async () => {
        const response = await request.get("/api");
        expect(response.status).toBe(200);
    });
    it("Test the api endpoint response body", async () => {
        const response = await request.get("/api");
        expect(response.text).toBe("Main Routes Endpoint");
    });
});
