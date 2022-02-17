import { checkFileExists } from "../util";
import path from "path";

describe("Test checkFileExists Function", () => {
  it("Testing a valid image.",  () => {
    const imagePath = path.resolve("Images/fjord.jpg");
    const result = checkFileExists(imagePath);
    expect(result).toEqual(true);
  });

  it("Testing an invalid image.", () => {
    const imagePath = path.resolve("Images/invalidimage.jpg");
    const result = checkFileExists(imagePath);
    expect(result).toEqual(false);
  });
});

