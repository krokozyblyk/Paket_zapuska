const { DataTypes } = require('sequelize');

// Два отдельных подключения
const sqliteConn = new (require('sequelize'))('sqlite::memory:');
const postgresConn = new (require('sequelize'))('postgres://postgres:123@localhost:5433/zoo_magazin');

// Модели для SQLite
const SQLiteUser = sqliteConn.define('User', {
  user_id: { type: DataTypes.INTEGER, primaryKey: true },
  first_name: DataTypes.STRING,
  last_name: DataTypes.STRING,
  email: DataTypes.STRING,
  password_hash: DataTypes.STRING,
  city: DataTypes.STRING,
  role: DataTypes.STRING,
  bonus_balance: DataTypes.INTEGER
}, { tableName: 'users', timestamps: false });

console.log('🔄 Перенос данных...\n');

async function migrate() {
  try {
    // Читаем данные
    const sqliteDb = new (require('sequelize'))('sqlite', undefined, undefined, { dialect: 'sqlite', storage: '../zoo_magazin.sqlite', logging: false });
    await sqliteDb.authenticate();
    
    const tables = ['users', 'categories', 'stores', 'animals', 'services', 'products', 'promotions', 'cart', 'favorites', 'reviews', 'orders'];
    
    for (const table of tables) {
      try {
        const [rows] = await sqliteDb.query(`SELECT * FROM ${table} WHERE deleted_at IS NULL`);
        console.log(`${table}: ${rows.length} записей`);
      } catch(e) {
        console.log(`${table}: ${e.message.slice(0,30)}`);
      }
    }
    
    await sqliteDb.close();
  } catch(e) {
    console.log('Ошибка:', e.message);
  }
  process.exit(0);
}

migrate();