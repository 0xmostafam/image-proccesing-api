import { checkFileExists, checkParameters, manipulateImage } from "../util";
import path from "path";
import fs from "fs";

describe("Test checkFileExists Function", () => {
  it("Testing a valid image.", () => {
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

describe("Test checkParameters Function", () => {
  it("Testing a valid parameters.", () => {
    const result = checkParameters("200", "200");
    expect(result[0]).toEqual(true);
  });

  it("Testing an invalid width parameter.", () => {
    const result = checkParameters("invalid", "200");
    expect(result[0]).toEqual(false);
    expect(result[1]).toEqual("invalid width parameter");
  });
  it("Testing an invalid height parameter.", () => {
    const result = checkParameters("200", "invalid");
    expect(result[0]).toEqual(false);
    expect(result[1]).toEqual("invalid height parameter");
  });
  it("Testing an invalid width and height parameter.", () => {
    const result = checkParameters("invalid", "invalid");
    expect(result[0]).toEqual(false);
    expect(result[1]).toEqual("invalid width and height parameters");
  });
});

describe("Test manipulateImage and resizeImage Functions", () => {
  it("Testing if it will result in a new resized image.", async () => {
    const newPath = await manipulateImage(
      path.resolve("Images/fjord.jpg"),
      200,
      200
    );
    const result = checkFileExists(
      path.resolve("thumbs/fjord_thumb_200_200.jpg")
    );
    expect(result).toEqual(true);
  });

  afterAll(() => {
    fs.rmdir(
      path.resolve("thumbs"),
      {
        recursive: true,
      },
      (error) => {
        if (error) {
          console.log(error);
        }
      }
    );
  });
});
