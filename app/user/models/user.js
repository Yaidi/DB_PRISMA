import { Model } from 'objection';

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
  return User.query().insert({ email, password }).returning('*');
};

export { User as default, insertUser };
