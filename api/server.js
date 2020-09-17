const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieparser = require('cookie-parser');

const server = express();

const itemsRouter = require('../routes/items-router.js');

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(cookieparser());

server.use('/api/items', itemsRouter);

module.exports = server;
