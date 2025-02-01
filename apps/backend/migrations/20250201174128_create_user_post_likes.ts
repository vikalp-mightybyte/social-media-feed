import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('user_post_likes', (table) => {
    table.increments('id').primary();
    table.string('user_id').notNullable();
    table.integer('post_id').unsigned().notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();

    table
      .foreign('post_id')
      .references('id')
      .inTable('posts')
      .onDelete('CASCADE');

    table.unique(['user_id', 'post_id']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('user_post_likes');
}
