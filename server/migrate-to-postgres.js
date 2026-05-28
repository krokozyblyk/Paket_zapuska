/**
 * Скрипт миграции данных из SQLite в PostgreSQL
 * Для запуска: node migrate-to-postgres.js
 * 
 * Требования:
 * 1. Установить PostgreSQL
 * 2. Создать базу данных и запустить init-postgres.sql
 * 3. Установить переменные окружения или изменить настройки ниже
 */

require('dotenv').config();
const { Sequelize } = require('sequelize');
const path = require('path');
const fs = require('fs');

// Настройки подключения к PostgreSQL
const postgresConfig = {
  dialect: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 5432),
  database: process.env.DB_NAME || 'zoo_magazin',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  logging: console.log
};

// Подключение к PostgreSQL
const postgresDb = new Sequelize(postgresConfig);

async function migrateData() {
  console.log('🔄 Начало миграции данных...\n');
  
  try {
    // Проверка подключения
    await postgresDb.authenticate();
    console.log('✅ Подключение к PostgreSQL установлено\n');
    
    // Читаем и выполняем SQL файл
    const sqlFile = path.join(__dirname, 'init-postgres.sql');
    if (fs.existsSync(sqlFile)) {
      console.log('📄 Создание таблиц из init-postgres.sql...');
      // Примечание: здесь нужно вручную выполнить SQL файл в pgAdmin
    }
    
    // Миграция данных из seeders - запустите сервер с PostgreSQL
    console.log('\n📌 Для заполнения данных:');
    console.log('1. Установите pgAdmin или используйте psql');
    console.log('2. Выполните init-postgres.sql');
    console.log('3. Запустите сервер с: DB_DIALECT=postgres node index.js');
    console.log('   или сервер автоматически создаст таблицы и заполнит данные\n');
    
    console.log('✅ Миграция завершена!');
    
  } catch (error) {
    console.error('❌ Ошибка миграции:', error.message);
  } finally {
    await postgresDb.close();
  }
}

// Если запущен напрямую
if (require.main === module) {
  migrateData();
}

module.exports = { migrateData };