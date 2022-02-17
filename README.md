# Udacity Image Proccesing API

## Project Structure

```
├── build
├── Images
├── thumbs
├── node_modules
├── spec
│      └── support
│           └── jasmine.json
├── src
│     ├──  tests
│     │     ├── helpers
│     │     │      └── reporter.ts
│     │     ├── imagesSpec.ts
│     │     ├── routesSpec.ts
│     │     └── utilSpec.ts
│     ├──routes
│     │     ├── api
│     │     │      └── images.ts
│     │     └── routes.ts
│     ├── index.ts
│     ├── middleware.ts
│     └── util.ts
├── package-lock.json
├── package.json
├── .eslint.json
├── .gitignore
└── tsconfig.json

```

## Backend Logic

- i used routes to make it a scalable software so later if i wanted for example to add videos endpoint, i can just create a `videos.ts` in the api folder and link it in the `routes.ts`
- `util.ts` has three functions
  - `checkFileExists` : checks if the given path has a file/folder
  - `resizeImage` : has the logic of resizing an image
  - `manipulateImage` : i created this function so later if i wanted to add more features to the manipulations of an image i can just create the function and add it to manipulateImage
- `middleware.ts`: has the functions that act like middleware, at the time of writing i only added a logger that logs every request made on the server
- `images.ts` : this is the endpoint the shows the image, i first check if i have a given image name or not then i check if the image is avaliable then check if i was given a width and height parameters or not, if all checks passed i show the image

## Testing

- i created a file for each endpoint in `tests` folder except index because it doesnt return anything in my case

## Running

- to run the project you can use `npm run start`
- to test the project you can use `npm run test`
- you can access the endpoint after running by using any of these url below

```
http://localhost:8000/api/images?imageName=fjord.jpg // to access the full image

http://localhost:8000/api/images?imageName=fjord.jpg&width=200&height=200 // to test the resizing functionality
```
