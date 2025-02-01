import {
  Arg,
  Authorized,
  Ctx,
  ID,
  Mutation,
  Query,
  Resolver,
} from 'type-graphql';
import { PostModel, UserPostLike } from '../../db';
import type { AuthenticatedContext } from '../../types/context';
import { CreatePostInput, LikePostInput, Post } from './post.schema';

@Resolver()
export class PostResolver {
  @Query(() => Post, { nullable: true })
  async post(
    @Arg('id', () => ID) id: string,
    @Ctx() { userId }: AuthenticatedContext
  ) {
    const post = await PostModel.query().findById(id);
    if (!post) return null;

    const like = await UserPostLike.query()
      .where({ userId, postId: id })
      .first();

    return {
      ...post,
      isLiked: !!like,
    };
  }

  @Authorized()
  @Mutation(() => Post)
  async createPost(
    @Arg('input') { title, content }: CreatePostInput,
    @Ctx() { userId }: AuthenticatedContext
  ) {
    return PostModel.query()
      .insert({
        title,
        content,
        userId,
        likesCount: 0,
      })
      .returning('*');
  }

  @Authorized()
  @Mutation(() => Post)
  async likePost(
    @Arg('input') { postId, isLiked }: LikePostInput,
    @Ctx() { userId }: AuthenticatedContext
  ) {
    const trx = await PostModel.startTransaction();

    try {
      const post = await PostModel.query(trx).findById(parseInt(postId));
      if (!post) {
        throw new Error('Post not found');
      }

      const existingLike = await UserPostLike.query(trx)
        .where({ userId, postId: parseInt(postId) })
        .first();

      if (isLiked && !existingLike) {
        // Like the post
        await UserPostLike.query(trx).insert({
          userId,
          postId: parseInt(postId),
        });

        const updatedPost = await PostModel.query(trx)
          .findById(parseInt(postId))
          .increment('likesCount', 1)
          .returning('*')
          .first();

        await trx.commit();

        return {
          ...updatedPost,
          isLiked: true,
        };
      } else if (!isLiked && existingLike) {
        // Unlike the post
        await UserPostLike.query(trx)
          .where({ userId, postId: parseInt(postId) })
          .delete();

        const updatedPost = await PostModel.query(trx)
          .findById(parseInt(postId))
          .decrement('likesCount', 1)
          .returning('*')
          .first();

        await trx.commit();

        return {
          ...updatedPost,
          isLiked: false,
        };
      }

      // If the requested state matches current state, return current post
      await trx.commit();
      return {
        ...post,
        isLiked: !!existingLike,
      };
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  }
}
