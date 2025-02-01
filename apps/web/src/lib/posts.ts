import { api } from './api';

export async function getPosts() {
  return await api.getPosts();
}
