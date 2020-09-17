require('dotenv').config();
const server = require('./api/server');

const PORT =
  process.env.NODE_ENV === 'testing' ? 3400 : process.env.PORT || 3300;

server.listen(PORT, () => {
  console.log(`\n=== Server listening on port ${PORT}===\n`);
});

module.exports = server;
