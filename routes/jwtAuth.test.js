const request = require('supertest');
const app = require('../app.js');

jest.useRealTimers();

describe('POST /register', () => {

	describe('given username, email, password', () => {

		it('should respond with a 200 status code', async () => {
			const res = await request(app).post('/auth/register').send({
				name: 'uuuu',
				email: 'uuuuu@gmail.com',
				password: 'u6-password'
			});
			expect(res.statusCode).toBe(200);
		}, 15000);

		it('should respond with json', async () => {
			const res = await request(app).post('/auth/register').send({
				name: 'uuuuuuuuu',
				email: 'uuuuuuuu@gmail.com',
				password: 'u7-password'
			});
			expect(res.headers['content-type']).toEqual(expect.stringContaining('json'));
		}, 15000);
	});

	describe('given user that already exists', () => {

		it('should respond with a 400 status code', async () => {
			const res = await request(app).post('/auth/register').send({
				name: 'u1',
				email: 'u1@gmail.com',
				password: 'u1-password'
			});
			expect(res.statusCode).toBe(401);
		}, 15000);

	});

	describe('given invalid info', () => {

		it('should respond with a 400 status code', async () => {
			const res = await request(app).post('/auth/register').send({
				name: 'uuuu',
				email: 'u1',
				password: 'u1-password'
			});
			expect(res.statusCode).toBe(401);
		}, 15000);

	});
});


describe('POST /login', () => {

	describe('given email and password', () => {

		it('should respond with a 200 status code', async () => {
			const res = await request(app).post('/auth/login').send({
				email: 'cupcake@gmail.com',
				password: 'cupcake'
			});
			expect(res.statusCode).toBe(200);
		});

		it('should respond with json', async () => {
			const res = await request(app).post('/auth/login').send({
				email: 'cupcake@gmail.com',
				password: 'cupcake'
			});
			expect(res.headers['content-type']).toEqual(expect.stringContaining('json'));
		}, 15000);

	});

	describe('given user that does not exist', () => {

		it('should respond with a 400 status code', async () => {
			const res = await request(app).post('/auth/login').send({
				email: 'matcha@gmail.com',
				password: 'matcha'
			});
			expect(res.statusCode).toBe(401);
		}, 15000);

	});

	describe('given invalid info', () => {

		it('should respond with a 400 status code', async () => {
			const res = await request(app).post('/auth/login').send({
				email: 'cupcake@gmail.com',
				password: 'candy'
			});
			expect(res.statusCode).toBe(401);
		}, 15000);

	});
});





