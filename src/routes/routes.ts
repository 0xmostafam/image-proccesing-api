import express, { Request, Response, Router } from "express";
import imagesRoute from "./api/images";
import { logger } from "../middleware";

const routes = express.Router();

routes.use(logger);

routes.get("/", (req: Request, res: Response) => {
  res.send("Main Routes Endpoint");
});

routes.use("/images", imagesRoute);

export default routes;
