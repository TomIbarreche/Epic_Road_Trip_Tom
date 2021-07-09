
exports.up = function(knex) {
    return knex.schema.createTable('options', table => {
      table.string('option_name').notNullable().primary();
      table.string('option_value');
    })
  };

  exports.down = function(knex) {
    return knex.schema.dropTable('options');
  };
