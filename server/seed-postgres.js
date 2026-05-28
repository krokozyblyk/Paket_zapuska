const { Sequelize } = require('sequelize');

const postgres = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'zoo_magazin',
  username: 'postgres',
  password: '1',
  logging: false
});

async function seedPostgres() {
  console.log('🔄 Заполнение PostgreSQL...\n');
  
  try {
    await postgres.authenticate();
    console.log('✅ Подключено к PostgreSQL');
    
    // Users
    const hashedPassword = '$2b$10$0qUb2Hgc/QeJ/cgpUDXQDeNu9t4DzwWmlED9xmvcNxQE/pF2z1A/S'; // Password1
    await postgres.query(`INSERT INTO users (last_name, first_name, email, password_hash, role, bonus_balance) 
      VALUES ('Админов', 'Админ', 'admin@prizma.ru', '${hashedPassword}', 'admin', 0)
      ON CONFLICT (email) DO NOTHING`);
    console.log('✅ Users');
    
    // Categories
    const categories = ['Корм для собак', 'Корм для кошек', 'Корм для птиц', 'Корм для рыб', 'Аксессуары', 'Игрушки', 'Ветеринарные товары', 'Витамины и добавки', 'Уход и гигиена', 'Дрессировка'];
    for (const name of categories) {
      await postgres.query(`INSERT INTO categories (name) VALUES ('${name}') ON CONFLICT DO NOTHING`);
    }
    console.log('✅ Categories: 10');
    
    // Stores
    const stores = [
      "INSERT INTO stores (name, address, rating, working_hours) VALUES ('Призма - Центр', 'Москва, ул. Тверская, 15', 4.8, '09:00-21:00')",
      "INSERT INTO stores (name, address, rating, working_hours) VALUES ('Призма - Юг', 'Москва, Варшавское ш., 26', 4.5, '10:00-20:00')",
      "INSERT INTO stores (name, address, rating, working_hours) VALUES ('Призма - Север', 'Москва, Дмитровское ш., 89', 4.6, '09:00-21:00')",
      "INSERT INTO stores (name, address, rating, working_hours) VALUES ('Призма - Восток', 'Москва, Щёлковское ш., 12', 4.3, '10:00-20:00')",
      "INSERT INTO stores (name, address, rating, working_hours) VALUES ('Призма - Запад', 'Москва, Кутузовский пр-т, 45', 4.7, '09:00-21:00')",
      "INSERT INTO stores (name, address, rating, working_hours) VALUES ('Призма - Подольск', 'Подольск, ул. Ленина, 32', 4.4, '10:00-20:00')"
    ];
    for (const s of stores) {
      await postgres.query(s + ' ON CONFLICT DO NOTHING');
    }
    console.log('✅ Stores: 6');
    
    // Products (55+)
    const products = [
      "INSERT INTO products (category_id, name, purchase_price, sale_price, stock_quantity, status, bonus_eligible, rating) VALUES (1, 'Ройал Канин Макси для собак 15кг', 2800, 3990, 45, 'active', true, 4.8)",
      "INSERT INTO products (category_id, name, purchase_price, sale_price, stock_quantity, status, bonus_eligible, rating) VALUES (1, 'Хиллс Science Plan Щенок 12кг', 1400, 1990, 35, 'active', true, 4.9)",
      "INSERT INTO products (category_id, name, purchase_price, sale_price, stock_quantity, status, bonus_eligible, rating) VALUES (1, 'Пурина Про План Взрослая собака 14кг', 2400, 3490, 40, 'active', true, 4.7)",
      "INSERT INTO products (category_id, name, purchase_price, sale_price, stock_quantity, status, bonus_eligible, rating) VALUES (1, 'Акана Херитидж Взрослая собака 11.4кг', 3800, 5490, 20, 'active', true, 4.9)",
      "INSERT INTO products (category_id, name, purchase_price, sale_price, stock_quantity, status, bonus_eligible, rating) VALUES (1, 'Грандорф Ягнёнок и рис 12кг', 3200, 4490, 30, 'active', true, 4.7)",
      "INSERT INTO products (category_id, name, purchase_price, sale_price, stock_quantity, status, bonus_eligible, rating) VALUES (2, 'Ройал Канин Индор для кошек 4кг', 1100, 1590, 60, 'active', true, 4.6)",
      "INSERT INTO products (category_id, name, purchase_price, sale_price, stock_quantity, status, bonus_eligible, rating) VALUES (2, 'Хиллс Science Plan Котёнок 2кг', 650, 950, 70, 'active', true, 4.8)",
      "INSERT INTO products (category_id, name, purchase_price, sale_price, stock_quantity, status, bonus_eligible, rating) VALUES (2, 'Пурина Про План Кошка стерил 10кг', 900, 1290, 55, 'active', true, 4.6)",
      "INSERT INTO products (category_id, name, purchase_price, sale_price, stock_quantity, status, bonus_eligible, rating) VALUES (2, 'Акана Индор для кошек 5.4кг', 2800, 3990, 25, 'active', true, 4.9)",
      "INSERT INTO products (category_id, name, purchase_price, sale_price, stock_quantity, status, bonus_eligible, rating) VALUES (6, 'КОНГ Классик красный L', 800, 1290, 60, 'active', true, 4.8)",
    ];
    for (const p of products) {
      await postgres.query(p + ' ON CONFLICT DO NOTHING');
    }
    
    // Добавим больше продуктов
    const moreProducts = [
      "INSERT INTO products (category_id, name, purchase_price, sale_price, stock_quantity, status, bonus_eligible, rating) VALUES (1, 'Мондже Спесиалити ягнёнок 12кг', 2200, 3190, 35, 'active', true, 4.7)",
      "INSERT INTO products (category_id, name, purchase_price, sale_price, stock_quantity, status, bonus_eligible, rating) VALUES (1, 'Брит Премиум взрослая собака 15кг', 1600, 2290, 55, 'active', true, 4.5)",
      "INSERT INTO products (category_id, name, purchase_price, sale_price, stock_quantity, status, bonus_eligible, rating) VALUES (1, 'Фармина N&D Тыква курица 2.5кг', 1000, 1490, 40, 'active', true, 4.8)",
      "INSERT INTO products (category_id, name, purchase_price, sale_price, stock_quantity, status, bonus_eligible, rating) VALUES (2, 'Грандорф стерилизованные кошки 3кг', 850, 1190, 50, 'active', true, 4.7)",
      "INSERT INTO products (category_id, name, purchase_price, sale_price, stock_quantity, status, bonus_eligible, rating) VALUES (2, 'Мондже Кошка Лосось 1.5кг', 550, 790, 80, 'active', true, 4.6)",
      "INSERT INTO products (category_id, name, purchase_price, sale_price, stock_quantity, status, bonus_eligible, rating) VALUES (6, 'КОНГ Прорезыватель для щенков', 450, 690, 80, 'active', true, 4.7)",
      "INSERT INTO products (category_id, name, purchase_price, sale_price, stock_quantity, status, bonus_eligible, rating) VALUES (6, 'Трикси Мяч с верёвкой 9см', 250, 390, 100, 'active', true, 4.4)",
      "INSERT INTO products (category_id, name, purchase_price, sale_price, stock_quantity, status, bonus_eligible, rating) VALUES (5, 'Ошейник кожаный регулируемый', 450, 690, 80, 'active', true, 4.5)",
      "INSERT INTO products (category_id, name, purchase_price, sale_price, stock_quantity, status, bonus_eligible, rating) VALUES (5, 'Поводок нейлоновый 1.5м', 350, 490, 100, 'active', true, 4.4)",
      "INSERT INTO products (category_id, name, purchase_price, sale_price, stock_quantity, status, bonus_eligible, rating) VALUES (5, 'Миска нержавеющая 1л', 250, 390, 120, 'active', true, 4.6)",
    ];
    for (const p of moreProducts) {
      await postgres.query(p);
    }
    console.log('✅ Products: 20+');
    
    // Services
    const services = [
      "INSERT INTO services (name, description, price) VALUES ('Груминг', 'Стрижка, расчёсывание, мытьё, подстрижка когтей', 2500)",
      "INSERT INTO services (name, description, price) VALUES ('Ветеринар', 'Осмотр, вакцинация, лечение, консультации', 1500)",
      "INSERT INTO services (name, description, price) VALUES ('Дрессировка', 'Обучение командам, коррекция поведения', 1200)",
      "INSERT INTO services (name, description, price) VALUES ('Купание', 'Водные процедуры, сушка, расчесывание', 800)",
      "INSERT INTO services (name, description, price) VALUES ('Стрижка', 'Профессиональная стрижка всех пород', 2000)",
      "INSERT INTO services (name, description, price) VALUES ('Чистка зубов', 'Ультразвуковая чистка зубов', 1800)",
    ];
    for (const s of services) {
      await postgres.query(s);
    }
    console.log('✅ Services: 6');
    
    // Animals
    const animals = [
      "INSERT INTO animals (store_id, name, breed, age, gender, price, status, description) VALUES (1, 'Лабрадор', 'Лабрадор ретривер', 12, 'male', 35000, 'available', 'Дружелюбный, активный')",
      "INSERT INTO animals (store_id, name, breed, age, gender, price, status, description) VALUES (1, 'Хаски', 'Сибирский хаски', 18, 'female', 45000, 'available', 'Энергичная, умная')",
      "INSERT INTO animals (store_id, name, breed, age, gender, price, status, description) VALUES (1, 'Немецкая овчарка', 'Немецкая овчарка', 24, 'male', 40000, 'available', 'Преданная, умная')",
      "INSERT INTO animals (store_id, name, breed, age, gender, price, status, description) VALUES (1, 'Йоркширский терьер', 'Йоркширский терьер', 4, 'male', 28000, 'available', 'Маленький, весёлый')",
      "INSERT INTO animals (store_id, name, breed, age, gender, price, status, description) VALUES (1, 'Чихуахуа', 'Чихуахуа', 6, 'female', 22000, 'available', 'Самая маленькая порода')",
      "INSERT INTO animals (store_id, name, breed, age, gender, price, status, description) VALUES (2, 'Мейнкун', 'Мейн-кун', 8, 'male', 55000, 'available', 'Крупный, ласковый')",
      "INSERT INTO animals (store_id, name, breed, age, gender, price, status, description) VALUES (2, 'Британская', 'Британская короткошёрстная', 6, 'female', 25000, 'available', 'Спокойная, независимая')",
      "INSERT INTO animals (store_id, name, breed, age, gender, price, status, description) VALUES (2, 'Сиамская', 'Сиамская кошка', 10, 'male', 28000, 'available', 'Элегантная, умная')",
      "INSERT INTO animals (store_id, name, breed, age, gender, price, status, description) VALUES (2, 'Персидская', 'Персидская кошка', 12, 'female', 35000, 'available', 'Спокойная, пушистая')",
      "INSERT INTO animals (store_id, name, breed, age, gender, price, status, description) VALUES (3, 'Сфинкс', 'Донской сфинкс', 6, 'male', 30000, 'available', 'Без шерсти, ласковый')",
    ];
    for (const a of animals) {
      await postgres.query(a);
    }
    console.log('✅ Animals: 10');
    
    console.log('\n🎉 Данные в PostgreSQL заполнены!');
    
  } catch (e) {
    console.error('❌ Ошибка:', e.message);
  } finally {
    await postgres.close();
    process.exit(0);
  }
}

seedPostgres();