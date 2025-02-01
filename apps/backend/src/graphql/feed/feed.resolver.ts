import { Args, Authorized, Ctx, Query, Resolver } from 'type-graphql';
import { PostModel, UserPostLike } from '../../db';
import { PaginationArgs } from '../utils/pagination';
import { PaginatedFeedResult } from './feed.schema';
import type { AuthenticatedContext } from '../../types/context';

@Resolver()
export class FeedResolver {
  @Authorized()
  @Query(() => PaginatedFeedResult)
  async feed(
    @Args() { limit, next }: PaginationArgs,
    @Ctx() { userId }: AuthenticatedContext
  ) {
    let query = PostModel.query()
      .orderBy('createdAt', 'desc')
      .limit(limit + 1);

    if (next) {
      query = query.where('id', '<=', next);
    }

    const items = await query.execute();
    const nextCursor = items.length > limit ? items[limit]?.id : null;
    const postsToReturn = items.slice(0, limit);

    // Get like status for each post
    let likedPostIds = new Set<number>();
    if (userId) {
      const postIds = postsToReturn.map((post) => post.id);
      const userLikes = await UserPostLike.query()
        .where('userId', userId)
        .whereIn('postId', postIds);

      likedPostIds = new Set(userLikes.map((like) => like.postId));
    }

    return {
      items: postsToReturn.map((post) => ({
        ...post,
        isLiked: likedPostIds.has(post.id),
      })),
      next: nextCursor,
    };
  }
}
