import { checkImageExists } from '../util';
import path from 'path';

describe('Test async checkImageExists Function', () => {
	it('Testing a valid image.', async () => {
		const imagePath = path.resolve('Images/fjord.jpg');
		const result = await checkImageExists(imagePath);
		expect(result).toEqual(true);
	});

	it('Testing an invalid image.', async () => {
		const imagePath = path.resolve('Images/invalidimage.jpg');
		const result = await checkImageExists(imagePath);
		expect(result).toEqual(false);
	});
});
