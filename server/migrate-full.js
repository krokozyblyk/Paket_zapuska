const { Sequelize } = require('sequelize');

const sqlite = new Sequelize({ dialect: 'sqlite', storage: '../zoo_magazin.sqlite', logging: false });
const postgres = new Sequelize({ dialect: 'postgres', host: 'localhost', port: 5433, database: 'zoo_magazin', username: 'postgres', password: '123', logging: false });

console.log('🔄 Перенос данных в PostgreSQL...\n');

async function migrate() {
  await sqlite.authenticate();
  await postgres.authenticate();
  
  const tables = ['users', 'categories', 'stores', 'animals', 'zoo_passports', 'animal_photos', 'services', 'products', 'product_photos', 'promotions', 'cart', 'favorites', 'reviews', 'orders', 'order_items', 'bonus_transactions', 'service_bookings', 'animal_reservations'];
  
  for (const table of tables) {
    try {
      const [rows] = await sqlite.query(`SELECT * FROM ${table}`);
      console.log(`${table}: ${rows.length} записей -> `);
      
      // Очистить таблицу в PostgreSQL
      await postgres.query(`DELETE FROM ${table}`);
      
      // Вставить данные
      for (const row of rows) {
        const cols = Object.keys(row).filter(k => k !== 'deletedAt');
        const vals = cols.map(c => {
          const v = row[c];
          if (v === null) return 'NULL';
          if (typeof v === 'string') return `'${v.replace(/'/g, "''")}'`;
          return v;
        });
        await postgres.query(`INSERT INTO ${table} (${cols.join(',')}) VALUES (${vals.join(',')})`);
      }
      console.log('✅');
    } catch (e) {
      console.log(`❌ ${e.message.slice(0, 50)}`);
    }
  }
  
  console.log('\n🎉 Готово!');
  await sqlite.close();
  await postgres.close();
  process.exit(0);
}

migrate().catch(e => { console.log('Ошибка:', e.message); process.exit(1); });