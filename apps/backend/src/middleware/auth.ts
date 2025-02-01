import { CognitoJwtVerifier } from 'aws-jwt-verify';
import { Context } from '../types/context';
import config from '../config/config';

const verifier = CognitoJwtVerifier.create({
  userPoolId: config.COGNITO_USER_POOL_ID,
  tokenUse: 'access',
  clientId: config.COGNITO_WEB_CLIENT_ID,
});

export async function verifyToken(token: string) {
  try {
    return await verifier.verify(token);
  } catch (err) {
    console.error('Token verification failed:', err);
    return null;
  }
}

export async function createContext({ req }: { req: any }): Promise<Context> {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return { userId: null };
  }

  const token = authHeader.split(' ')[1];
  const decodedToken = await verifyToken(token);

  return {
    userId: decodedToken?.sub || null,
  };
}
