exports.up = function(knex) {
  return knex.schema.createTable('User', function(table) {
    table.increments('id').primary();
    table.string('username').notNullable().unique();
    table.string('fullname').notNullable();
    table.string('email').notNullable().unique();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('User');
};
