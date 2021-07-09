
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('roles').del()
    .then(function () {
      // Inserts seed entries
      return knex('roles').insert([
        {id: 1, label: 'admin', description:'All rights.'},
        {id: 2, label: 'user', description:'A simple user.'}
      ]);
    });
};
