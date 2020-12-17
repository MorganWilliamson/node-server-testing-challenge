const db = require('../../data/dbConfig');

module.exports = {
    getAll,
    getById,
    insert,
    update,
    remove
};

function getAll() {
    return db('fruits');
}

function getById(id) {
    return db('fruits').where('id', id).first();
}

function insert(fruit) {
    const [id] = db('fruits').insert(fruit);
    return getById(id);
}

function update(fruit, id) {
    db('fruits').where({ id }).update(fruit);
    return getById(id);
}

function remove(id) {
    db('fruits').where({ id }).del();
    return getAll();
}