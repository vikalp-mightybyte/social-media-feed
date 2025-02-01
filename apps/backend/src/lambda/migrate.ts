import { Knex } from 'knex';
import { bootstrapDatabase } from '../db/setup';

type Event = {
  mode: 'ROLLBACK' | 'MIGRATE' | 'UP' | 'DOWN';
};

function getAction(db: Knex) {
  return {
    MIGRATE: () => db.migrate.latest(),
    ROLLBACK: () => db.migrate.rollback(),
    UP: () => db.migrate.up(),
    DOWN: () => db.migrate.down(),
  } as const;
}

export async function handler(event: Event) {
  try {
    const db = await bootstrapDatabase();
    const action = getAction(db)[event.mode];
    if (!action) {
      throw new Error(`Unknown migration mode: ${event.mode}`);
    }

    return await action();
  } catch (error) {
    console.error('Failed to run migration:', error);
    return { error };
  }
}
