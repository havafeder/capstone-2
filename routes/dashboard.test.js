const request = require('supertest');
const app = require('../app.js');

jest.useRealTimers();


describe('GET /', () => {

	it('should respond with 403 status code because it is unauthorized', async () => {
		const res = await request(app).get('/dashboard/').send({
			email: 'cupcake@gmail.com',
			password: 'cupcake'
		});
		expect(res.statusCode).toBe(403);
	}, 15000);

});

describe('GET /fact get random fact from fact api', () => {

	it('should respond with json', async () => {
		const res = await request(app).get('/dashboard/fact').send({
			url: 'https://api.api-ninjas.com/v1/facts?limit=1',
			headers: {
				'X-Api-Key': 'YEX5+9Cif8M7mM1DZTSDCA==kpfIQUeT1duH6w40'
			}
		});
		expect(res.headers['content-type']).toEqual(expect.stringContaining('json'));
	}, 15000);

});

describe('POST /todos', () => {

	it('should respond with 403 status code because it is unauthorized', async () => {
		const res = await request(app).post('/dashboard/todos').send({
			description: 'Walk dog'
		});
		expect(res.statusCode).toBe(403);
	})
	
})

describe('PUT /todos/:id', () => {

	it('should respond with 403 status code because it is unauthorized', async () => {
		const res = await request(app).put('/dashboard/todos/:id').send({
			id: 1,
			description: 'Walk cat'
		});
		expect(res.statusCode).toBe(403);
	})

})

describe('DELETE /todos/:id', () => {

	it('should respond with 403 status code because it is unauthorized', async () => {
		const res = await request(app).delete('/dashboard/todos/:id').send({
			id: 1
		});
		expect(res.statusCode).toBe(403);
	})

})

