import { NonEmptyArray } from 'type-graphql';
import { PostResolver } from './post';
import { FeedResolver } from './feed';

export const resolvers: NonEmptyArray<Function> = [PostResolver, FeedResolver];
