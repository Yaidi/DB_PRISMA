import { Model } from 'objection';

class Token extends Model {
  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }
  $beforeInsert() {
    this.createdAt = new Date().toISOString();
  }

  static get tableName() {
    return 'user_tokens';
  }
}

const insertToken = (user, deviceId) => {
  return Token.query().insert({ userId: user.id, deviceId }).returning('*');
};

export { Token as default, insertToken };
