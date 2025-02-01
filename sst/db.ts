import { vpc } from './vpc';

const database = new sst.aws.Postgres('DB', {
  vpc,
  proxy: true,
  dev: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    port: 5434,
  },
});

const databaseUrl = $interpolate`postgresql://${database.username}:${database.password}@${database.host}:${database.port}/${database.database}`;

// Runs only in dev mode
new sst.x.DevCommand('Docker:local', {
  dev: {
    command: 'docker-compose up',
    title: 'Docker Compose: Local',
  },
});

export { databaseUrl, database };
