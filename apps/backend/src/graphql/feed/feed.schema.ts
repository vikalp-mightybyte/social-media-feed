import { Field, ObjectType } from 'type-graphql';
import { Post } from '../post/post.schema';
import { PaginatedResult } from '../utils/pagination';

@ObjectType({ implements: [PaginatedResult] })
export class PaginatedFeedResult extends PaginatedResult<Post> {
  @Field(() => [Post])
  items!: Post[];
}
