module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host:     process.env.POSTGRES_HOST || 'db_1',
      port:     process.env.POSTGRES_PORT || 5432,
      database: process.env.POSTGRES_DB || 'myshop',
      user:     process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || '1234'
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
};