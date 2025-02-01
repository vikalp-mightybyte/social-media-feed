export interface Context {
  userId: string | null;
}

export interface AuthenticatedContext {
  userId: string;
}
