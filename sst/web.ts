import { api } from './api';
import { database } from './db';

export const web = new sst.aws.Nextjs('Web', {
  path: 'apps/web',
  environment: {
    NEXT_PUBLIC_API_URL: api.url,
  },
  link: [database]
});
