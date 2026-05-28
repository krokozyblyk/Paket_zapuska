const { Sequelize } = require('sequelize');

const sqlite = new Sequelize({ dialect: 'sqlite', storage: '../zoo_magazin.sqlite', logging: false });

console.log('🔄 Чтение данных из SQLite...\n');

async function getData() {
  await sqlite.authenticate();
  
  // Читаем через raw query
  const tables = ['users', 'categories', 'stores', 'animals', 'zoo_passports', 'animal_photos', 'services', 'products', 'product_photos', 'promotions', 'cart', 'favorites', 'reviews', 'notifications', 'orders', 'order_items', 'bonus_transactions', 'service_bookings', 'animal_reservations'];
  
  const data = {};
  for (const table of tables) {
    try {
      const [rows] = await sqlite.query(`SELECT * FROM ${table}`);
      data[table] = rows;
      console.log(`${table}: ${rows.length} записей`);
    } catch (e) {
      console.log(`${table}: ошибка - ${e.message}`);
    }
  }
  
  console.log('\n📊 Всего данных:');
  console.log(JSON.stringify(data, null, 2).slice(0, 500));
  
  await sqlite.close();
}

getData().catch(e => console.log('Ошибка:', e.message));