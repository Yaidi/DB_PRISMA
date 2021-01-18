import { Model } from 'objection';
import { hash } from 'bcrypt';

const SALT_ROUNDS = 10;

class User extends Model {
  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }
  $beforeInsert() {
    this.createdAt = new Date().toISOString();
  }

  static get tableName() {
    return 'users';
  }
}

const insertUser = async ({ email, password }) => {
  const hashedPassword = await hash(password, SALT_ROUNDS);

  return User.query()
    .insert({ email, password: hashedPassword })
    .returning('*');
};

export { User as default, insertUser };
