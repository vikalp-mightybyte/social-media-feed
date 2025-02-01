import { Field, ID, InputType, ObjectType } from 'type-graphql';

@ObjectType()
export class Post {
  @Field(() => ID)
  id!: string;

  @Field()
  title!: string;

  @Field()
  content!: string;
}

@InputType()
export class CreatePostInput {
  @Field()
  title!: string;

  @Field()
  content!: string;
}
