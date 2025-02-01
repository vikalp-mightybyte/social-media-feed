import { Field, ID, InputType, ObjectType } from 'type-graphql';

@ObjectType()
export class Post {
  @Field(() => ID)
  id!: string;

  @Field()
  title!: string;

  @Field()
  content!: string;

  @Field()
  createdAt!: Date;

  @Field(() => ID)
  userId!: string;

  @Field()
  likesCount!: number;

  @Field()
  isLiked!: boolean;
}

@InputType()
export class CreatePostInput {
  @Field()
  title!: string;

  @Field()
  content!: string;
}

@InputType()
export class LikePostInput {
  @Field(() => ID)
  postId!: string;

  @Field()
  isLiked!: boolean;
}
