const { Sequelize } = require('sequelize');
const path = require('path');

const commonConfig = {
  logging: false,
  define: {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
};

const isPostgres = process.env.DB_DIALECT === 'postgres';

const sequelize = isPostgres
  ? (process.env.DATABASE_URL
      ? new Sequelize(process.env.DATABASE_URL, {
          dialect: 'postgres',
          ...commonConfig,
          dialectOptions: process.env.DB_SSL === 'true' ? { ssl: { require: true, rejectUnauthorized: false } } : undefined,
        })
      : new Sequelize(
          process.env.DB_NAME || 'zoo_magazin',
          process.env.DB_USER || 'postgres',
          process.env.DB_PASSWORD || '',
          {
            host: process.env.DB_HOST || 'localhost',
            port: Number(process.env.DB_PORT || 5432),
            dialect: 'postgres',
            ...commonConfig,
          },
        ))
  : new Sequelize({
      dialect: 'sqlite',
      storage: path.join(__dirname, 'zoo_magazin.sqlite'),
      ...commonConfig
    });

module.exports = { sequelize };
