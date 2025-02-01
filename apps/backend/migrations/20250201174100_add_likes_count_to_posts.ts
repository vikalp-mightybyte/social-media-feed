import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("posts", (table) => {
    table.integer("likes_count").defaultTo(0).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("posts", (table) => {
    table.dropColumn("likes_count");
  });
}
