
exports.up = function(knex) {
    return knex.schema.createTable('roles_permissions', table => {
      table.integer('role_id').unsigned().notNullable().references('id').inTable('roles').onDelete('cascade').index();
      table.integer('permission_id').unsigned().notNullable().references('id').inTable('permissions').onDelete('cascade').index();
      table.primary(['role_id','permission_id']);
    })
  };

  exports.down = function(knex) {
    return knex.schema.dropTable('roles_permissions');
  };
