import knex from 'knex';
import { Model, knexSnakeCaseMappers } from 'objection';
import nconf from 'nconf';
import knexConfig from '../knexfile';

const env = nconf.get('NODE_ENV') || 'development';
const connectionArgs = { ...knexConfig[env], ...knexSnakeCaseMappers() };
const db = knex(connectionArgs);

Model.knex(db);

if (env !== 'test') {
  db.on('query', ({ sql, bindings }) => {
    const bindingsLog = bindings ? bindings.join(', ') : '';
    const oneLineSql = sql.replace(/\n/g, ' ');
    const logMessage = `[SQL]: ${oneLineSql} [${bindingsLog}]`;

    if (!logMessage.includes('dbIsUp')) {
      console.log(logMessage);
    }
  });

  db.on('query-error', (error) => {
    console.log(`[SQL-ERROR]: ${error}`);
  });
}

export default db;
