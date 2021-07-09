exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, user_name: 'admin', first_name: 'Administrator', last_name: 'god', email: 'admin@roadtrip.eu', password:'$2a$12$3xhaxNHbdg35gi0/5PrkUuFwfaPgyIOUBVptTpK4eUlYZfuI/SqFW', phone:'', birthday:'2020-02-12 20:00:00', role_id: 1},
        {id: 2, user_name: 'simpleuser', first_name: 'Simple', last_name: 'user', email: 'simple.user@roadtrip.eu', password:'$2a$12$3xhaxNHbdg35gi0/5PrkUuFwfaPgyIOUBVptTpK4eUlYZfuI/SqFW', phone:'', birthday:'2020-02-12 20:00:00', role_id: 2},
      ]);
    });
};
