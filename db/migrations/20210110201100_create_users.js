exports.up = async function (knex) {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

  await knex.schema.createTable('users', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('username').notNullable();
    table.string('password').notNullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('NOW()'));
    table.timestamp('updated_at').notNullable().defaultTo(knex.raw('NOW()'));
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
