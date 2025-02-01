import { Arg, Args, Ctx, ID, Mutation, Query, Resolver } from 'type-graphql';
import { CreatePostInput, Post } from './post.schema';

@Resolver()
export class PostResolver {
  @Query(() => Post, { nullable: true })
  async post(@Arg('id', () => ID) id: string) {
    // Temporary implementation returning mock data
    return {
      id: id
    };
  }

  @Mutation(() => Post)
  async createPost(
    @Arg('input') { title, content }: CreatePostInput
  ) {
    // Temporary implementation returning mock data
    return {
      id: Date.now().toString()
    };
  }
}
