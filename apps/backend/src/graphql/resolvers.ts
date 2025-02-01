import { NonEmptyArray } from 'type-graphql';
import { PostResolver } from './post';

export const resolvers: NonEmptyArray<Function> = [PostResolver];
