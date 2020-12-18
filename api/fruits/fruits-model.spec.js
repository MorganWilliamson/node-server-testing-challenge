const db = require('../../data/dbConfig');
const Fruit = require('./fruits-model');

const cherry = { name: "Cherry" };

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

describe('Fruit Model Tests:', () => {
    it('Fruit.getAll returns empty array if no fruits', async () => {
        const result = await Fruit.getAll();
        expect(result).toHaveLength(0);
    });
    it('Fruit.getAll returns fruits', async () => {
        await db('fruits').insert(cherry);
        const result = await Fruit.getAll();
        expect(result).toHaveLength(1);
        expect(result[0]).toHaveProperty('id');
        expect(result[0]).toHaveProperty('name', 'Cherry');
        expect(result[0]).toMatchObject(cherry);
    });
});