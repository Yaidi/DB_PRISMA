import { Model } from 'objection';
import { hash, compare } from 'bcrypt';

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

const insertUser = async ({ username, password }) => {
  const hashedPassword = await hash(password, SALT_ROUNDS);

  return User.query()
    .insert({ username, password: hashedPassword })
    .returning('*');
};

const findUserByUsername = async (username) => {
  return User.query().where({ username }).first().throwIfNotFound();
};

const isPasswordValid = async (user, password) => {
  return compare(user.password, password);
};
export { User as default, insertUser, findUserByUsername, isPasswordValid };
