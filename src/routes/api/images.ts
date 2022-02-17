import express from "express";
import { Request, Response } from "express";
import { checkFileExists, checkParameters, manipulateImage } from "../../util";
import path from "path";

const imageDirPath: string = path.resolve("Images");
const imagesRoute = express.Router();

imagesRoute.get("/", async (req: Request, res: Response) => {
  // Check if image is specified
  if (!req.query.imageName) {
    res.status(400);
    res.send("missing parameter imageName");
    return;
  }

  let imagePath = path.join(imageDirPath, req.query.imageName as string);
  const imageExists = checkFileExists(imagePath);
  // Check if the image does exist
  if (imageExists) {
    // Check if we have height and width parameters
    // if yes we call the manipulationImage function to resize it and recieve the path of the new image
    // if no we show the user the normal image
    if (req.query.height && req.query.width) {
      const result = checkParameters(
        req.query.width as string,
        req.query.height as string
      );

      if (!result[0]) {
        res.status(400);
        res.send(result[1]);
      }
      imagePath = await manipulateImage(
        imagePath,
        parseInt(req.query.height as string),
        parseInt(req.query.width as string)
      );
    }

    res.status(200);
    res.sendFile(imagePath);
  } else {
    res.status(400);
    res.send("Image not found");
  }
});

export default imagesRoute;
