import express from "express";
import { Request, Response } from "express";

const imagesRoute = express.Router();
imagesRoute.get("/", (req: Request, res: Response) => {
  res.send("Image Endpoint");
});

export default imagesRoute;
