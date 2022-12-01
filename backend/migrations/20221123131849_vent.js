/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('vent', function(table) {
        table.increments('id').primary,
        table.string('title').notNullable,
        table.string('content').notNullable,
        table.string('tag').notNullable,
        table.integer('likes'),
        table.integer('dislikes'),
        table.timestamp('stamp')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('vent')
};
