const express = require('express');

const server = express();

server.use(express.json());

const fruitsRouter = require('./fruits/fruits-router');
server.use('/fruits', fruitsRouter);

server.get('/', (req, res) => {
    res.json({ api: "Up!" });
});

module.exports = server;
