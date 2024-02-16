module.exports = {
    development: {
      client: 'pg',
      connection: {
        host: '127.0.0.1',
        port: 5432,
        user: 'postgres',
        password: '123456',
        database: 'ndt'
      },
      migrations: {
        directory: 'backend/models/migrations'
      },
      seeds: {
        directory: './seeds'
      }
    }
  };
