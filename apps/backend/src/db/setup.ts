import { Model } from 'objection';
import Knex from 'knex';
import knexConfig from '../../knexfile';
import { once } from '../utils/once';

export const bootstrapDatabase = once(async () => {
  const knex = Knex(knexConfig);
  Model.knex(knex);
  return knex;
});
