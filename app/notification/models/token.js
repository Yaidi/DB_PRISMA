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
  const tokenParams = { userId: user.id, deviceId };
  return Token.query().insert(tokenParams).returning('*');
};

export { Token as default, insertToken };
