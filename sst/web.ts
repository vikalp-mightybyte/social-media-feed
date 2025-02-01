import { api } from './api';
import { cognitoWebClient, cognitoUserPool } from './auth';

const region = aws.getRegionOutput();

export const web = new sst.aws.Nextjs('Web', {
  path: 'apps/web',
  environment: {
    NEXT_PUBLIC_API_URL: api.url,
    NEXT_PUBLIC_AWS_REGION: region.name,
    NEXT_PUBLIC_COGNITO_USER_POOL_ID: cognitoUserPool.id,
    NEXT_PUBLIC_COGNITO_CLIENT_ID: cognitoWebClient.id,
    // COGNITO_CLIENT_SECRET: cognitoWebClient.secret,
    // COGNITO_ISSUER: $interpolate`https://cognito-idp.${region.name}.amazonaws.com/${cognitoUserPool.id}`,
  },
});
