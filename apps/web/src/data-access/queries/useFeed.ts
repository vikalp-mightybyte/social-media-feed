import { gql } from '@/__generated__';
import { useQuery } from '@apollo/client';

const FEED_QUERY = gql(`
  query Feed($limit: Int, $next: String) {
    feed(limit: $limit, next: $next) {
      items {
        id
        title
        content
        createdAt
        userId
        likesCount
        isLiked
      }
      next
    }
  }
`);

export function useFeed(input: { limit: number; next?: string }) {
  return useQuery(FEED_QUERY, { variables: input });
}
