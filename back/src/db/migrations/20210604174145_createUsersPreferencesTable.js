exports.up = function(knex) {
    return knex.schema.createTable('users_preferences', table => {
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('cascade').index();
      table.integer('id').unsigned().notNullable();
      table.string('pref_key').notNullable();
      table.string('pref_value').notNullable();
      table.primary(['user_id','id']);
    }).raw("DROP SEQUENCE IF EXISTS users_preferences_id_auto; CREATE SEQUENCE users_preferences_id_auto; ALTER TABLE users_preferences ALTER id set default nextval('users_preferences_id_auto'); SELECT setval('users_preferences_id_auto', (SELECT MAX(id) FROM users_preferences) + 1);");
  };

  exports.down = function(knex) {
    return knex.schema.dropTable('users_preferences');
  };