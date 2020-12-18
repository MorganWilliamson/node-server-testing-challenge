const request = require('supertest');
const server = require('./server');
const db = require('../../data/dbConfig');

const Cherry = { name: "Cherry" };

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
});

beforeEach(async () => {
    await db('fruits').truncate();
});

afterAll(async () => {
    await db.destroy();
});

describe('Endpoint Tests:', () => {
    describe('GET /fruits', () => {
        it('response with a status code of 200', async () => {
            const res = await request(server).get('/fruits');
            expect(res.status).toBe(200);
        });

        it('response with empty array if no fruits', async () => {
            const res = await request(server).get('/fruits');
            expect(res.body).toHaveLength(0);
        });
    });

    describe('POST /fruits', () => {
        it('returns the newly created fruit', async () => {
            const res = await request(server).post('/fruits').send(Cherry);
            expect(res.body.id).toBe(6);
            expect(res.body.name).toBe('Cherry');
        });

        it('does not allow two fruits with the same name', async () => {
            await request(server).post('/fruits').send(Cherry);
            const res = await request(server).post('/fruits').send(Cherry);
            expect(res.status).toBe(500);
        });
    });
});