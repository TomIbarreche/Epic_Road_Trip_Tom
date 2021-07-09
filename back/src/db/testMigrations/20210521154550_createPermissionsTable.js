
exports.up = function(knex) {
    return knex.schema.createTable('permissions', table => {
      table.increments('id');
      table.string('label').notNullable();
      table.string('description');
    })
  };

  exports.down = function(knex) {
    return knex.schema.dropTable('permissions');
  };
