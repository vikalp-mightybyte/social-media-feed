import { vpc } from './vpc';

export const database = new sst.aws.Postgres('DB', {
  vpc,
  proxy: true,
  dev: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    port: 5434,
  },
});

// Runs only in dev mode
new sst.x.DevCommand('Docker:local', {
  dev: {
    command: 'docker-compose up',
    title: 'Docker Compose: Local',
  },
});
