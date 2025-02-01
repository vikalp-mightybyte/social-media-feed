import { Model } from 'objection';

export class PostModel extends Model {
  static tableName = 'posts';

  id!: number;
  title!: string;
  content!: string;
}
