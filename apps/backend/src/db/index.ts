import { Resource } from 'sst';
import { Pool } from 'pg';

console.log("DB Resource: ", Resource.DB.username);


const client = new Pool({
  user: Resource.DB.username,
  password: Resource.DB.password,
  database: Resource.DB.database,
  host: Resource.DB.host,
  port: Resource.DB.port,
});
await client.connect();

