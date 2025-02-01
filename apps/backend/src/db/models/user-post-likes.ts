import { Model } from 'objection';

export class UserPostLike extends Model {
  static tableName = 'user_post_likes';

  id!: number;
  userId!: string;
  postId!: number;
  createdAt!: Date;
}
