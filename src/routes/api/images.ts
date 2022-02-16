import express from "express";
import { Request, Response } from "express";
import { checkImageExists, manipulateImage } from "../../util";
import path from "path";

const imageDirPath: string = path.resolve("Images");
const imagesRoute = express.Router();

imagesRoute.get("/", async (req: Request, res: Response) => {
  // Check if image is specified
  if (!req.query.imageName) {
    res.send("missing parameter imageName");
  }
  let imagePath = path.join(imageDirPath, req.query.imageName as string);

  if (await checkImageExists(imagePath)) {
    if (req.query.height && req.query.width) {
      imagePath = await manipulateImage(
        imagePath,
        parseInt(req.query.height as string),
        parseInt(req.query.width as string)
      );
    }

    res.sendFile(imagePath);
  } else {
    res.send("Image not found");
  }
});

export default imagesRoute;
