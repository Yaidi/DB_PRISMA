const nconf = require('nconf');

nconf.env().file({ file: '.env.json' });

module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: 'gp_dev',
      host: nconf.get('DB_HOST'),
      user: nconf.get('DB_USER'),
      password: nconf.get('DB_PASSWORD'),
    },
    migrations: {
      directory: 'db/migrations',
    },
    seeds: {
      directory: 'db/seeds',
    },
  },

  test: {
    client: 'pg',
    connection: {
      database: 'gp_test',
      user: nconf.get('DB_USER'),
      password: nconf.get('DB_PASSWORD'),
    },
    migrations: {
      directory: 'db/migrations',
    },
    seeds: {
      directory: 'db/seeds',
    },
  },

  production: {
    client: 'pg',
    connection: `${nconf.get('DATABASE_URL')}`,
    ssl: {
      rejectUnauthorized: false,
    },
    migrations: {
      directory: 'db/migrations',
    },
    seeds: {
      directory: 'db/seeds',
    },
  },
};
