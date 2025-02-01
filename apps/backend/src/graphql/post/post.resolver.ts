import { Arg, ID, Mutation, Query, Resolver } from 'type-graphql';
import { PostModel } from '../../db';
import { CreatePostInput, Post } from './post.schema';

@Resolver()
export class PostResolver {
  @Query(() => Post, { nullable: true })
  async post(@Arg('id', () => ID) id: string) {
    return PostModel.query().findById(id);
  }

  @Mutation(() => Post)
  async createPost(@Arg('input') { title, content }: CreatePostInput) {
    return PostModel.query().insert({ title, content });
  }
}
