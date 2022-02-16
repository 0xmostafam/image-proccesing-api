import express, { Request, Response } from "express";
import imagesRoute from "./api/images";

const routes = express.Router();

routes.get("/", (req: Request, res: Response) => {
  res.send("Main Routes Endpoint");
});

routes.use("/images", imagesRoute);

export default routes;
