import { Max, Min } from 'class-validator';
import { ArgsType, Field, Int, InterfaceType } from 'type-graphql';

@ArgsType()
export class PaginationArgs {
  @Field(() => String, { nullable: true })
  next?: string | null;

  @Min(1)
  @Max(50)
  @Field(() => Int, { nullable: true, defaultValue: 10 })
  limit!: number;
}

@InterfaceType()
export abstract class PaginatedResult<T> {
  @Field(() => String, { nullable: true })
  next!: string | null;

  abstract items: T[];
}
