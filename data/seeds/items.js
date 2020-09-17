exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('items')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('items').insert([
        { name: 'bowl', description: 'a bowl', price: 1000 },
        { name: 'iPhone', description: 'iPhone 8S', price: 1000 },
        {
          name: 'iPad',
          description: 'the latest iPad, works great!',
          price: 1000,
        },
      ]);
    });
};
