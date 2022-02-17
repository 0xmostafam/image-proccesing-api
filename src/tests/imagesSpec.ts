import supertest from "supertest";
import app from "../index";

const request = supertest(app);

describe("Test images endpoint responses in case of not specifying the image name", () => {
  it("Test the images endpoint response code and body", async () => {
    const response = await request.get("/api/images");
    expect(response.status).toBe(400);
    expect(response.text).toBe("missing parameter imageName");
  });
});

describe("Test images endpoint responses in case of specifying the image name", () => {
  it("Test the images endpoint response with a valid image", async () => {
    const response = await request.get("/api/images?imageName=fjord.jpg");
    expect(response.status).toBe(200);
  });

  it("Test the images endpoint response with a valid image and valid width/height parameters", async () => {
    const response = await request.get(
      "/api/images?imageName=fjord.jpg&width=200&height=200"
    );
    expect(response.status).toBe(200);
  });

  it("Test the images endpoint response with a valid image and invalid width/height parameters", async () => {
    const response = await request.get(
      "/api/images?imageName=fjord.jpg&width=invalid&height=invalid"
    );
    expect(response.status).toBe(400);
    expect(response.text).toBe("invalid width and height parameters");
  });

  it("Test the images endpoint response with a valid image and invalid width parameter", async () => {
    const response = await request.get(
      "/api/images?imageName=fjord.jpg&width=invalid&height=200"
    );
    expect(response.status).toBe(400);
    expect(response.text).toBe("invalid width parameter");
  });

  it("Test the images endpoint response with a valid image and invalid height parameter", async () => {
    const response = await request.get(
      "/api/images?imageName=fjord.jpg&width=200&height=invalid"
    );
    expect(response.status).toBe(400);
    expect(response.text).toBe("invalid height parameter");
  });

  it("Test the images endpoint response response code and body", async () => {
    const response = await request.get(
      "/api/images?imageName=invalidimage.jpg"
    );
    expect(response.status).toBe(400);
    expect(response.text).toBe("Image not found");
  });
});
