exports.up = function (knex) {
  return (
    knex.schema
      .createTable('users', users => {
        users.increments('id');

        users.string('username', 255).notNullable().unique();
        users.string('password', 255).notNullable();
      })
      // .createTable('markets', markets => {
      //   markets.increments('id');
      //   markets.string('name', 255);
      //   markets.string('location', 255);
      // })
      .createTable('items', items => {
        items.increments('id');
        items.string('name', 255).notNullable();
        items.string('description', 255);
        items.float('price').notNullable();
      })
  );
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users').dropTableIfExists('items');
};
