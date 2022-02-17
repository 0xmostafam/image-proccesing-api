import { checkFileExists } from "../util";
import path from "path";

describe("Test async checkFileExists Function", () => {
  it("Testing a valid image.", async () => {
    const imagePath = path.resolve("Images/fjord.jpg");
    const result = await checkFileExists(imagePath);
    expect(result).toEqual(true);
  });

  it("Testing an invalid image.", async () => {
    const imagePath = path.resolve("Images/invalidimage.jpg");
    const result = await checkFileExists(imagePath);
    expect(result).toEqual(false);
  });
});
