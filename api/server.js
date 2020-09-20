const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieparser = require('cookie-parser');

const server = express();

const auth = require('../middleware/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const itemsRouter = require('../routes/items-router.js');
const usersRouter = require('../routes/users-router.js');
// const server = require('../index.js');

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(cookieparser());

server.use('/api/auth', authRouter);
server.use('/api/items', itemsRouter);
server.use('/api/users', auth(), usersRouter);

server.get('/', (req, res) => {
  res.json({ message: "it's alive!" });
});
module.exports = server;
