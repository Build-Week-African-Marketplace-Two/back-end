const db = require('../data/config.js');

module.exports = {
  find,
  findBy,
  findById,
  add,
  update,
  remove,
};

function find() {
  return db('items').select('id', 'name', 'description', 'price');
}

function findBy(filter) {
  return db('items').where(filter);
}

function findById(id) {
  return db('items').where({ id }).first();
}

async function add(item) {
  const [id] = await db('items').insert(item, 'id');
  return id;
  // return findById(id);
}

async function update(id, changes) {
  await db('items').where({ id }).update(changes);
  return findById(id);
}

function remove(id) {
  return db('items').where({ id }).del();
}
