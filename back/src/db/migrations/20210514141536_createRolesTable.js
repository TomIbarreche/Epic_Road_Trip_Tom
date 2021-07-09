
exports.up = function(knex) {
    return knex.schema.createTable('roles', table => {
      table.increments('id');
      table.string('label').notNullable();
      table.string('description');
    })
  };

  exports.down = function(knex) {
    return knex.schema.dropTable('roles');
  };
