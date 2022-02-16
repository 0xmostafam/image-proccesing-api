"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const images_1 = __importDefault(require("./api/images"));
const middleware_1 = require("../middleware");
const routes = express_1.default.Router();
routes.use(middleware_1.logger);
routes.get("/", (req, res) => {
    res.send("Main Routes Endpoint");
});
routes.use("/images", images_1.default);
exports.default = routes;
