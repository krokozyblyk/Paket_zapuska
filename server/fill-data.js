const bcrypt = require('bcrypt');
const { User, Category, Store, Product, ProductPhoto, Service, Animal, AnimalPhoto, ZooPassport, Promotion } = require('./models');

async function seedData() {
  console.log('🔄 Заполнение данных...\n');
  
  try {
    const hashedPassword = await bcrypt.hash('Password1', 10);
    
    // Users
    const admin = await User.findOne({ where: { role: 'admin' } });
    if (!admin) {
      await User.create({ last_name: 'Админов', first_name: 'Админ', email: 'admin@prizma.ru', password_hash: hashedPassword, role: 'admin' });
    }
    console.log('✅ Users');
    
    // Categories
    const catCount = await Category.count();
    if (catCount === 0) {
      await Category.bulkCreate([
        { name: 'Корм' },
        { name: 'Игрушки' },
        { name: 'Аксессуары' },
        { name: 'Дрессировка' },
        { name: 'Уход и гигиена' }
      ]);
    }
    console.log('✅ Categories');
    
    // Stores
    const storeCount = await Store.count();
    if (storeCount === 0) {
      await Store.bulkCreate([
        { name: 'Призма - Центр', address: 'Москва, ул. Тверская, 15', rating: 4.8, working_hours: '09:00-21:00' },
        { name: 'Призма - Юг', address: 'Москва, Варшавское ш., 26', rating: 4.5, working_hours: '10:00-20:00' },
        { name: 'Призма - Север', address: 'Москва, Дмитровское ш., 89', rating: 4.6, working_hours: '09:00-21:00' }
      ]);
    }
    console.log('✅ Stores');
    
    // Products
    const prodCount = await Product.count();
    if (prodCount === 0) {
      const корм = await Category.findOne({ where: { name: 'Корм' } });
      const игрушки = await Category.findOne({ where: { name: 'Игрушки' } });
      
      await Product.bulkCreate([
        { category_id: корм.category_id, name: 'Ройал Канин для собак 15кг', purchase_price: 2800, sale_price: 3990, stock_quantity: 45, status: 'active', bonus_eligible: true },
        { category_id: корм.category_id, name: 'Ройал Канин для кошек 4кг', purchase_price: 1100, sale_price: 1590, stock_quantity: 60, status: 'active', bonus_eligible: true },
        { category_id: корм.category_id, name: 'Хиллс для щенков 12кг', purchase_price: 1400, sale_price: 1990, stock_quantity: 35, status: 'active', bonus_eligible: true },
        { category_id: корм.category_id, name: 'Хиллс для котят 2кг', purchase_price: 650, sale_price: 950, stock_quantity: 70, status: 'active', bonus_eligible: true },
        { category_id: корм.category_id, name: 'Пурина Про План собака 14кг', purchase_price: 2400, sale_price: 3490, stock_quantity: 40, status: 'active', bonus_eligible: true },
        { category_id: корм.category_id, name: 'Акана для собак 11.4кг', purchase_price: 3800, sale_price: 5490, stock_quantity: 20, status: 'active', bonus_eligible: true },
        { category_id: корм.category_id, name: 'Грандорф ягнёнок 12кг', purchase_price: 3200, sale_price: 4490, stock_quantity: 30, status: 'active', bonus_eligible: true },
        { category_id: игрушки.category_id, name: 'КОНГ классик красный L', purchase_price: 800, sale_price: 1290, stock_quantity: 60, status: 'active', bonus_eligible: true },
        { category_id: игрушки.category_id, name: 'КОНГ прорезыватель для щенков', purchase_price: 450, sale_price: 690, stock_quantity: 80, status: 'active', bonus_eligible: true },
        { category_id: игрушки.category_id, name: 'Трикси мяч с верёвкой', purchase_price: 250, sale_price: 390, stock_quantity: 100, status: 'active', bonus_eligible: true }
      ]);
    }
    console.log('✅ Products');
    
    // Services
    const servCount = await Service.count();
    if (servCount === 0) {
      await Service.bulkCreate([
        { name: 'Груминг', description: 'Стрижка, расчёсывание, мытьё.', price: 2500, photo_url: 'https://images.pexels.com/photos/6816856/pexels-photo-6816856.jpeg' },
        { name: 'Ветеринар', description: 'Осмотр, вакцинация, лечение.', price: 1500, photo_url: 'https://images.pexels.com/photos/8434728/pexels-photo-8434728.jpeg' },
        { name: 'Дрессировка', description: 'Обучение, коррекция поведения.', price: 1200, photo_url: 'https://images.pexels.com/photos/6235233/pexels-photo-6235233.jpeg' },
        { name: 'Купание', description: 'Водные процедуры, сушка.', price: 800, photo_url: 'https://images.pexels.com/photos/4513353/pexels-photo-4513353.jpeg' }
      ]);
    }
    console.log('✅ Services');
    
    // Animals
    const animCount = await Animal.count();
    if (animCount === 0) {
      const store1 = await Store.findOne();
      await Animal.bulkCreate([
        { store_id: store1.store_id, name: 'Лабрадор', breed: 'Лабрадор ретривер', age: 12, gender: 'male', price: 35000, status: 'available', description: 'Дружелюбный, активный' },
        { store_id: store1.store_id, name: 'Хаски', breed: 'Сибирский хаски', age: 18, gender: 'female', price: 45000, status: 'available', description: 'Энергичная, умная' },
        { store_id: store1.store_id, name: 'Мейнкун', breed: 'Мейн-кун', age: 8, gender: 'male', price: 55000, status: 'available', description: 'Крупный, ласковый' },
        { store_id: store1.store_id, name: 'Британская', breed: 'Британская короткошёрстная', age: 6, gender: 'female', price: 25000, status: 'available', description: 'Спокойная, независимая' },
        { store_id: store1.store_id, name: 'Йоркширский терьер', breed: 'Йоркширский терьер', age: 4, gender: 'male', price: 28000, status: 'available', description: 'Маленький, весёлый' }
      ]);
    }
    console.log('✅ Animals');
    
    console.log('\n🎉 Данные заполнены!');
    console.log('Users:', await User.count());
    console.log('Products:', await Product.count());
    console.log('Services:', await Service.count());
    console.log('Animals:', await Animal.count());
    
  } catch (e) {
    console.error('❌ Ошибка:', e.message);
  }
  process.exit(0);
}

seedData();