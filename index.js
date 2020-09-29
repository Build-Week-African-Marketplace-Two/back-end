require('dotenv').config();
const server = require('./api/server');

const PORT =
  process.env.NODE_ENV === 'testing' ? 3400 : process.env.PORT || 3300;

// server.listen(process.env.PORT, () => {
//   //console.log('DB_HOST: ', process.env.DB_HOST);
//   console.log(`\n=== Server listening on port ${process.env.PORT}===\n`);
// });

module.exports = server;
