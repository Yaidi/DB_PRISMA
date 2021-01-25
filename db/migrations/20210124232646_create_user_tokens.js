exports.up = async function (knex) {
  await knex.schema.createTable('user_tokens', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.uuid('user_id').notNullable();
    table.string('device_id').notNullable();
    table.string('os').notNullable().defaultTo('android');
    table.string('last_access_at');
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('NOW()'));
    table.timestamp('updated_at').notNullable().defaultTo(knex.raw('NOW()'));

    table.foreign('user_id').references('users');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('user_tokens');
};
