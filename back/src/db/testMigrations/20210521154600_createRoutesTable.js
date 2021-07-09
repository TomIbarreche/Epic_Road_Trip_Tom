
exports.up = function(knex) {
    return knex.schema.createTable('routes', table => {
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('cascade').index();
      table.integer('id').unsigned().notNullable().unique();
      table.timestamp('date_planned').notNullable().defaultTo(knex.fn.now());
      table.timestamp('departure');
      table.string('from_label').notNullable();
      table.string('from_coords').notNullable();
      table.string('to_label').notNullable();
      table.string('to_coords').notNullable();
      table.primary(['user_id','id']);
    }).raw("DROP SEQUENCE IF EXISTS routes_id_auto; CREATE SEQUENCE routes_id_auto; ALTER TABLE routes ALTER id set default nextval('routes_id_auto'); SELECT setval('routes_id_auto', (SELECT MAX(id) FROM routes) + 1);");
  };

  exports.down = function(knex) {
    return knex.schema.dropTable('routes');
  };
