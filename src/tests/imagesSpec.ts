import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('Test images endpoint responses in case of not specifying the image name', () => {
	it('Test the images endpoint response code', async () => {
		const response = await request.get('/api/images');
		expect(response.status).toBe(400);
	});

	it('Test the images endpoint response body', async () => {
		const response = await request.get('/api/images');
		expect(response.text).toBe('missing parameter imageName');
	});
});

describe('Test images endpoint responses in case of specifying the image name', () => {
	it('Test the images endpoint response code with a valid image', async () => {
		const response = await request.get('/api/images?imageName=fjord.jpg');
		expect(response.status).toBe(200);
	});

	it('Test the images endpoint response body', async () => {
		const response = await request.get(
			'/api/images?imageName=invalidimage.jpg'
		);
		expect(response.status).toBe(400);
	});

	it('Test the images endpoint response body', async () => {
		const response = await request.get(
			'/api/images?imageName=invalidimage.jpg'
		);
		expect(response.text).toBe('Image not found');
	});
});
