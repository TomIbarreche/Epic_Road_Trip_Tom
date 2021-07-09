
exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id');
        table.string('user_name').notNullable().unique();
        table.string('first_name');
        table.string('last_name');
        table.string('email').notNullable().unique();
        table.string('password').notNullable()
        table.string('phone');
        table.date('birthday');
        table.integer('role_id').unsigned().notNullable().references('id').inTable('roles').onDelete('cascade').index().defaultTo(1);
        table.timestamps(true, true);
    })
  };

  exports.down = function(knex) {
    return knex.schema.dropTable('users');
  };
