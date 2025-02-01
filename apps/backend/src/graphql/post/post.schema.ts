import { Field, ID, InputType, ObjectType } from 'type-graphql';

@ObjectType()
export class Post {
  @Field(() => ID)
  id!: string;
}

@InputType()
export class CreatePostInput {
  @Field()
  title!: string;

  @Field()
  content!: string;
}
