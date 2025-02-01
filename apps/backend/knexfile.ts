import type { Knex } from 'knex';
import config from './src/config/config';
import knexStringCase from 'knex-stringcase';

const knexConfig: Knex.Config = {
  client: 'pg',
  connection: config.DATABASE_URL,
  ...knexStringCase(),
};

export default knexConfig;
