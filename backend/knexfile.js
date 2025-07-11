// 🗄️ Configuração do Knex para Migration e Seed
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/maonamassa.db'
    },
    migrations: {
      directory: './src/infrastructure/database/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './src/infrastructure/database/seeds'
    },
    useNullAsDefault: true,
    debug: false
  },

  staging: {
    client: 'postgresql',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      database: process.env.DB_NAME || 'maonamassa',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres'
    },
    migrations: {
      directory: './src/infrastructure/database/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './src/infrastructure/database/seeds'
    },
    pool: {
      min: 2,
      max: 10
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
    },
    migrations: {
      directory: './src/infrastructure/database/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './src/infrastructure/database/seeds'
    },
    pool: {
      min: 2,
      max: 10
    }
  }
}; 