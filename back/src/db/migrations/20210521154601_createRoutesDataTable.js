
exports.up = function(knex) {
    return knex.schema.createTable('routes_data', table => {
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('cascade').index();
      table.integer('route_id').unsigned().notNullable().references('id').inTable('routes');
      table.string('data_key').notNullable();
      table.string('data_value');
      table.primary(['user_id','route_id','data_key']);
    })
  };

  exports.down = function(knex) {
    return knex.schema.dropTable('routes_data');
  };
