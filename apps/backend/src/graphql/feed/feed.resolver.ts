import { Args, Query, Resolver } from 'type-graphql';
import { PostModel } from '../../db';
import { PaginationArgs } from '../utils/pagination';
import { PaginatedFeedResult } from './feed.schema';

@Resolver()
export class FeedResolver {
  @Query(() => PaginatedFeedResult)
  async feed(@Args() { limit, next }: PaginationArgs) {
    let query = PostModel.query()
      .orderBy('createdAt', 'desc')
      .limit(limit + 1);

    if (next) {
      query = query.where('id', '<=', next);
    }

    const items = await query.execute();
    const nextCursor = items.length > limit ? items[limit]?.id : null;

    return {
      items: items.slice(0, limit),
      next: nextCursor,
    };
  }
}
