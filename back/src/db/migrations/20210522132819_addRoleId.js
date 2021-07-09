exports.up = function(knex) {
    return knex.schema.table('users', table => {
        table.integer('role_id').unsigned().notNullable().references('id').inTable('roles').onDelete('cascade').index().defaultTo(1);
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.table('users', table => {
        table.dropColumn('role_id')
    }) 
  };
  