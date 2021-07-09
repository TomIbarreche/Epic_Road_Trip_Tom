
exports.up = function(knex) {
    return knex.schema.createTable('steps_reviews', table => {
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('cascade').index();
      table.integer('route_id').unsigned().notNullable().references('id').inTable('routes').onDelete('cascade').index();
      table.integer('step_id').unsigned().notNullable().references('id').inTable('routes_steps').onDelete('cascade').index();
      table.integer('id').unsigned().notNullable().unique();
      table.string('review').notNullable();
      table.integer('rate').unsigned();
      table.integer('reviewer_id').unsigned().notNullable().references('id').inTable('users').onDelete('cascade').index();
      table.primary(['user_id','route_id','step_id','id']);
    }).raw("DROP SEQUENCE IF EXISTS steps_reviews_id_auto; CREATE SEQUENCE steps_reviews_id_auto; ALTER TABLE steps_reviews ALTER id set default nextval('steps_reviews_id_auto'); SELECT setval('steps_reviews_id_auto', (SELECT MAX(id) FROM steps_reviews) + 1);");
  };

  exports.down = function(knex) {
    return knex.schema.dropTable('steps_reviews');
  };
