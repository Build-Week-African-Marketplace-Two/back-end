require('dotenv').config();
const server = require('./api/server');

const PORT =
  process.env.NODE_ENV === 'testing' ? 3400 : process.env.PORT || 3300;

server.listen(process.env.PORT || 5000);

module.exports = server;
