
exports.up = function(knex) {
    return knex.schema.createTable('routes_steps', table => {
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('cascade').index();
      table.integer('route_id').unsigned().notNullable().references('id').inTable('routes').onDelete('cascade').index();
      table.integer('id').unsigned().notNullable().unique();
      table.string('coords').notNullable();
      table.string('data');
      table.primary(['user_id','route_id','id']);
    }).raw("DROP SEQUENCE IF EXISTS routes_step_id_auto; CREATE SEQUENCE routes_step_id_auto; ALTER TABLE routes_steps ALTER id set default nextval('routes_step_id_auto'); SELECT setval('routes_step_id_auto', (SELECT MAX(id) FROM routes_steps) + 1);");
  };

  exports.down = function(knex) {
    return knex.schema.dropTable('routes_steps');
  };
