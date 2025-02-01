/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  mutation CreatePost($input: CreatePostInput!) {\n    createPost(input: $input) {\n      id\n      title\n      content\n      createdAt\n      userId\n    }\n  }\n": typeof types.CreatePostDocument,
    "\n  fragment NewPost on Post {\n    id\n    title\n    content\n    createdAt\n  }\n": typeof types.NewPostFragmentDoc,
    "\n  mutation LikePost($input: LikePostInput!) {\n    likePost(input: $input) {\n      id\n      title\n      content\n      createdAt\n      userId\n      likesCount\n      isLiked\n    }\n  }\n": typeof types.LikePostDocument,
    "\n  query Feed($limit: Int, $next: String) {\n    feed(limit: $limit, next: $next) {\n      items {\n        id\n        title\n        content\n        createdAt\n        userId\n        likesCount\n        isLiked\n      }\n      next\n    }\n  }\n": typeof types.FeedDocument,
};
const documents: Documents = {
    "\n  mutation CreatePost($input: CreatePostInput!) {\n    createPost(input: $input) {\n      id\n      title\n      content\n      createdAt\n      userId\n    }\n  }\n": types.CreatePostDocument,
    "\n  fragment NewPost on Post {\n    id\n    title\n    content\n    createdAt\n  }\n": types.NewPostFragmentDoc,
    "\n  mutation LikePost($input: LikePostInput!) {\n    likePost(input: $input) {\n      id\n      title\n      content\n      createdAt\n      userId\n      likesCount\n      isLiked\n    }\n  }\n": types.LikePostDocument,
    "\n  query Feed($limit: Int, $next: String) {\n    feed(limit: $limit, next: $next) {\n      items {\n        id\n        title\n        content\n        createdAt\n        userId\n        likesCount\n        isLiked\n      }\n      next\n    }\n  }\n": types.FeedDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreatePost($input: CreatePostInput!) {\n    createPost(input: $input) {\n      id\n      title\n      content\n      createdAt\n      userId\n    }\n  }\n"): (typeof documents)["\n  mutation CreatePost($input: CreatePostInput!) {\n    createPost(input: $input) {\n      id\n      title\n      content\n      createdAt\n      userId\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment NewPost on Post {\n    id\n    title\n    content\n    createdAt\n  }\n"): (typeof documents)["\n  fragment NewPost on Post {\n    id\n    title\n    content\n    createdAt\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation LikePost($input: LikePostInput!) {\n    likePost(input: $input) {\n      id\n      title\n      content\n      createdAt\n      userId\n      likesCount\n      isLiked\n    }\n  }\n"): (typeof documents)["\n  mutation LikePost($input: LikePostInput!) {\n    likePost(input: $input) {\n      id\n      title\n      content\n      createdAt\n      userId\n      likesCount\n      isLiked\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Feed($limit: Int, $next: String) {\n    feed(limit: $limit, next: $next) {\n      items {\n        id\n        title\n        content\n        createdAt\n        userId\n        likesCount\n        isLiked\n      }\n      next\n    }\n  }\n"): (typeof documents)["\n  query Feed($limit: Int, $next: String) {\n    feed(limit: $limit, next: $next) {\n      items {\n        id\n        title\n        content\n        createdAt\n        userId\n        likesCount\n        isLiked\n      }\n      next\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;