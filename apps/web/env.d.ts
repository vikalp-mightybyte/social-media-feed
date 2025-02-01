declare namespace NodeJS {
  export interface ProcessEnv {
    readonly NEXT_PUBLIC_API_URL: string;
    readonly NEXT_PUBLIC_AWS_REGION: string;
    readonly NEXT_PUBLIC_COGNITO_USER_POOL_ID: string;
    readonly NEXT_PUBLIC_COGNITO_CLIENT_ID: string;
  }
}
