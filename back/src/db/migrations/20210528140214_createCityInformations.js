
exports.up = function(knex) {
    return knex.schema.createTable('city_informations', table => {
        table.increments('id');
        table.string('city_name').notNullable().unique();
        table.string('city_json_informations').notNullable();
    })
  };

  exports.down = function(knex) {
    return knex.schema.dropTable('city_informations');
  };
