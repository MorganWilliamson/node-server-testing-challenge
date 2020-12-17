const express = require('express');
const Fruit = require('./fruits-model');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const fruits = await Fruit.getAll();
        res.status(200).json(fruits);
    } catch (err) {
        res.status(500).json(err.message);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const fruit = await Fruit.getById(req.params.id);
        if (!fruit) {
            return res.status(400).json({ message: "No fruit found with that ID." });
        } else {
            res.status(200).json(fruit);
        }
    } catch (err) {
        res.status(500).json(err.message);
    }
});

router.post('/', async (req, res) => {
    try {
        const fruit = await Fruit.insert(req.body);
        res.status(201).json(fruit);
    } catch (err) {
        res.status(400).json(err.message);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Fruit.remove(id);
        res.status(200).json({ message: "Fruit deleted." });
    } catch (err) {
        res.status(500).json(err.message);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const changes = req.body;
        await Fruit.update(id, changes);
        const updated = await Fruit.getById(id);
        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



module.exports = router;