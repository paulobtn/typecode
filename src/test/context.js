const { randomBytes } = require('crypto');
const format = require('pg-format');
const { default: migrate } = require('node-pg-migrate');
const pool = require('../pool');
const pgCredentials = require('./../../pg-credentials');

class Context {
  static async build() {
    // Randomly generating a role and a schema to run the tests
    const roleName = 'user' + randomBytes(4).toString('hex');

    await pool.connect(pgCredentials);

    await pool.query(
      format('CREATE ROLE %I WITH LOGIN PASSWORD %L;', roleName, roleName)
    );
    await pool.query(
      format('CREATE SCHEMA %I AUTHORIZATION %I;', roleName, roleName)
    );

    await pool.close();

    // Run migrations for the new schema
    await migrate({
      schema: roleName,
      direction: 'up',
      log: () => {},
      noLock: true,
      dir: 'migrations',
      databaseUrl: {
        host: pgCredentials.host,
        port: pgCredentials.port,
        database: pgCredentials.database,
        user: roleName,
        password: roleName,
      },
    });

    // Connect to PG as the newly created role
    await pool.connect({
      host: pgCredentials.host,
      port: pgCredentials.port,
      database: pgCredentials.database,
      user: roleName,
      password: roleName,
    });

    return new Context(roleName);
  }

  constructor(roleName) {
    this.roleName = roleName;
  }

  async reset() {
    return pool.query(`
      DELETE FROM source;
    `);
  }

  async close() {
    // Disconnect from PG
    await pool.close();

    // Reconnect as our root user
    await pool.connect(pgCredentials);

    // Delete the role and schema we created
    await pool.query(format('DROP SCHEMA %I CASCADE;', this.roleName));
    await pool.query(format('DROP ROLE %I;', this.roleName));

    // Disconnect
    await pool.close();
  }
}

module.exports = Context;
