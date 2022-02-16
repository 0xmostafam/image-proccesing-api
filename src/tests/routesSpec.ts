import supertest from 'supertest';
import app from '../index';

const request = supertest(app);
describe('Test routes endpoint response', () => {
	it('Test the api endpoint response code', async () => {
		const response = await request.get('/api');
		expect(response.status).toBe(200);
	});

	it('Test the api endpoint response body', async () => {
		const response = await request.get('/api');
		expect(response.text).toBe('Main Routes Endpoint');
	});
});
