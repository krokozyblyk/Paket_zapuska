const bcrypt = require('bcrypt');
const { User, Category, Store, Product, ProductPhoto, Service, Animal, AnimalPhoto, ZooPassport, Promotion } = require('./models');

async function seedAll() {
  console.log('🔄 Полное заполнение данных...\n');
  
  try {
    const hashedPassword = await bcrypt.hash('Password1', 10);
    
    // Users
    let admin = await User.findOne({ where: { role: 'admin' } });
    if (!admin) {
      admin = await User.create({ last_name: 'Админов', first_name: 'Админ', email: 'admin@prizma.ru', password_hash: hashedPassword, role: 'admin', bonus_balance: 0 });
    }
    let user1 = await User.findOne({ where: { email: 'client@mail.ru' } });
    if (!user1) {
      user1 = await User.create({ last_name: 'Иванов', first_name: 'Иван', email: 'client@mail.ru', password_hash: hashedPassword, role: 'client', bonus_balance: 150 });
    }
    console.log('✅ Users: 2+');
    
    // Categories
    const categoriesData = [
      { name: 'Корм для собак' },
      { name: 'Корм для кошек' },
      { name: 'Корм для птиц' },
      { name: 'Корм для рыб' },
      { name: 'Аксессуары' },
      { name: 'Игрушки' },
      { name: 'Ветеринарные товары' },
      { name: 'Витамины и добавки' },
      { name: 'Уход и гигиена' },
      { name: 'Дрессировка' }
    ];
    
    await Category.destroy({ where: {} });
    const categories = await Category.bulkCreate(categoriesData);
    console.log('✅ Categories:', categories.length);
    
    // Stores
    const storesData = [
      { name: 'Призма - Центр', address: 'Москва, ул. Тверская, 15', rating: 4.8, working_hours: '09:00-21:00' },
      { name: 'Призма - Юг', address: 'Москва, Варшавское ш., 26', rating: 4.5, working_hours: '10:00-20:00' },
      { name: 'Призма - Север', address: 'Москва, Дмитровское ш., 89', rating: 4.6, working_hours: '09:00-21:00' },
      { name: 'Призма - Восток', address: 'Москва, Щёлковское ш., 12', rating: 4.3, working_hours: '10:00-20:00' },
      { name: 'Призма - Запад', address: 'Москва, Кутузовский пр-т, 45', rating: 4.7, working_hours: '09:00-21:00' },
      { name: 'Призма - Подольск', address: 'Подольск, ул. Ленина, 32', rating: 4.4, working_hours: '10:00-20:00' }
    ];
    
    await Store.destroy({ where: {} });
    const stores = await Store.bulkCreate(storesData);
    console.log('✅ Stores:', stores.length);
    
    // Products (50+)
    const productsData = [
      // Корм для собак
      { category_id: categories[0].category_id, name: 'Ройал Канин Макси для взрослых собак 15кг', purchase_price: 2800, sale_price: 3990, stock_quantity: 45, status: 'active', bonus_eligible: true, rating: 4.8 },
      { category_id: categories[0].category_id, name: 'Хиллс Science Plan Щенок 12кг', purchase_price: 1400, sale_price: 1990, stock_quantity: 35, status: 'active', bonus_eligible: true, rating: 4.9 },
      { category_id: categories[0].category_id, name: 'Пурина Про План Взрослая собака 14кг', purchase_price: 2400, sale_price: 3490, stock_quantity: 40, status: 'active', bonus_eligible: true, rating: 4.7 },
      { category_id: categories[0].category_id, name: 'Акана Херитидж Взрослая собака 11.4кг', purchase_price: 3800, sale_price: 5490, stock_quantity: 20, status: 'active', bonus_eligible: true, rating: 4.9 },
      { category_id: categories[0].category_id, name: 'Грандорф Ягнёнок и рис 12кг', purchase_price: 3200, sale_price: 4490, stock_quantity: 30, status: 'active', bonus_eligible: true, rating: 4.7 },
      { category_id: categories[0].category_id, name: 'Мондже Спесиалити ягнёнок 12кг', purchase_price: 2200, sale_price: 3190, stock_quantity: 35, status: 'active', bonus_eligible: true, rating: 4.7 },
      { category_id: categories[0].category_id, name: 'Брит Премиум взрослая собака 15кг', purchase_price: 1600, sale_price: 2290, stock_quantity: 55, status: 'active', bonus_eligible: true, rating: 4.5 },
      { category_id: categories[0].category_id, name: 'Фармина N&D Тыква курица 2.5кг', purchase_price: 1000, sale_price: 1490, stock_quantity: 40, status: 'active', bonus_eligible: true, rating: 4.8 },
      { category_id: categories[0].category_id, name: 'ПроПлан Энимал Нутришн 12кг', purchase_price: 2100, sale_price: 2990, stock_quantity: 25, status: 'active', bonus_eligible: true, rating: 4.6 },
      { category_id: categories[0].category_id, name: 'Ориджен Адалт Дог 12кг', purchase_price: 2900, sale_price: 4190, stock_quantity: 18, status: 'active', bonus_eligible: true, rating: 4.8 },
      
      // Корм для кошек
      { category_id: categories[1].category_id, name: 'Ройал Канин Индор для кошек 4кг', purchase_price: 1100, sale_price: 1590, stock_quantity: 60, status: 'active', bonus_eligible: true, rating: 4.6 },
      { category_id: categories[1].category_id, name: 'Хиллс Science Plan Котёнок 2кг', purchase_price: 650, sale_price: 950, stock_quantity: 70, status: 'active', bonus_eligible: true, rating: 4.8 },
      { category_id: categories[1].category_id, name: 'Пурина Про План Кошка стерил 10кг', purchase_price: 900, sale_price: 1290, stock_quantity: 55, status: 'active', bonus_eligible: true, rating: 4.6 },
      { category_id: categories[1].category_id, name: 'Акана Индор для кошек 5.4кг', purchase_price: 2800, sale_price: 3990, stock_quantity: 25, status: 'active', bonus_eligible: true, rating: 4.9 },
      { category_id: categories[1].category_id, name: 'Грандорф стерилизованные кошки 3кг', purchase_price: 850, sale_price: 1190, stock_quantity: 50, status: 'active', bonus_eligible: true, rating: 4.7 },
      { category_id: categories[1].category_id, name: 'Мондже Кошка Лосось 1.5кг', purchase_price: 550, sale_price: 790, stock_quantity: 80, status: 'active', bonus_eligible: true, rating: 4.6 },
      { category_id: categories[1].category_id, name: 'Бритcare для кошек 2кг', purchase_price: 750, sale_price: 1090, stock_quantity: 45, status: 'active', bonus_eligible: true, rating: 4.5 },
      { category_id: categories[1].category_id, name: 'Фармина N&D Курица для кошек 1кг', purchase_price: 850, sale_price: 1290, stock_quantity: 35, status: 'active', bonus_eligible: true, rating: 4.7 },
      { category_id: categories[1].category_id, name: 'Шеба Изи Фит 2кг', purchase_price: 450, sale_price: 690, stock_quantity: 65, status: 'active', bonus_eligible: true, rating: 4.4 },
      { category_id: categories[1].category_id, name: 'Гурме Голд стерил 2кг', purchase_price: 550, sale_price: 790, stock_quantity: 40, status: 'active', bonus_eligible: true, rating: 4.5 },
      
      // Игрушки
      { category_id: categories[5].category_id, name: 'КОНГ Классик красный L', purchase_price: 800, sale_price: 1290, stock_quantity: 60, status: 'active', bonus_eligible: true, rating: 4.8 },
      { category_id: categories[5].category_id, name: 'КОНГ Прорезыватель для щенков', purchase_price: 450, sale_price: 690, stock_quantity: 80, status: 'active', bonus_eligible: true, rating: 4.7 },
      { category_id: categories[5].category_id, name: 'КОНГ Вубба большой', purchase_price: 650, sale_price: 990, stock_quantity: 50, status: 'active', bonus_eligible: true, rating: 4.6 },
      { category_id: categories[5].category_id, name: 'Трикси Мяч с верёвкой 9см', purchase_price: 250, sale_price: 390, stock_quantity: 100, status: 'active', bonus_eligible: true, rating: 4.4 },
      { category_id: categories[5].category_id, name: 'Трикси Оленья косточка M', purchase_price: 400, sale_price: 590, stock_quantity: 70, status: 'active', bonus_eligible: true, rating: 4.7 },
      { category_id: categories[5].category_id, name: 'Фетч Френд мяч', purchase_price: 350, sale_price: 490, stock_quantity: 90, status: 'active', bonus_eligible: true, rating: 4.5 },
      { category_id: categories[5].category_id, name: 'Гаunting мягкая игрушка', purchase_price: 550, sale_price: 890, stock_quantity: 40, status: 'active', bonus_eligible: true, rating: 4.6 },
      { category_id: categories[5].category_id, name: 'Интерактивная игрушка с лакомством', purchase_price: 950, sale_price: 1490, stock_quantity: 25, status: 'active', bonus_eligible: true, rating: 4.8 },
      
      // Аксессуары
      { category_id: categories[4].category_id, name: 'Ошейник кожаный регулируемый', purchase_price: 450, sale_price: 690, stock_quantity: 80, status: 'active', bonus_eligible: true, rating: 4.5 },
      { category_id: categories[4].category_id, name: 'Поводок нейлоновый 1.5м', purchase_price: 350, sale_price: 490, stock_quantity: 100, status: 'active', bonus_eligible: true, rating: 4.4 },
      { category_id: categories[4].category_id, name: 'Миска нержавеющая 1л', purchase_price: 250, sale_price: 390, stock_quantity: 120, status: 'active', bonus_eligible: true, rating: 4.6 },
      { category_id: categories[4].category_id, name: 'Лежанка мягкая прямоугольная', purchase_price: 1200, sale_price: 1890, stock_quantity: 30, status: 'active', bonus_eligible: true, rating: 4.7 },
      { category_id: categories[4].category_id, name: 'Сумка-переноска для кошек', purchase_price: 850, sale_price: 1290, stock_quantity: 35, status: 'active', bonus_eligible: true, rating: 4.5 },
      { category_id: categories[4].category_id, name: 'Шлейка для хорьков', purchase_price: 550, sale_price: 790, stock_quantity: 25, status: 'active', bonus_eligible: true, rating: 4.4 },
      { category_id: categories[4].category_id, name: 'Амуниция для дрессировки набор', purchase_price: 1500, sale_price: 2290, stock_quantity: 15, status: 'active', bonus_eligible: true, rating: 4.8 },
      { category_id: categories[4].category_id, name: 'Когтеточка напольная', purchase_price: 900, sale_price: 1390, stock_quantity: 20, status: 'active', bonus_eligible: true, rating: 4.6 },
      
      // Витамины
      { category_id: categories[7].category_id, name: 'Витамины для собак комплекс 100таб', purchase_price: 450, sale_price: 690, stock_quantity: 50, status: 'active', bonus_eligible: true, rating: 4.5 },
      { category_id: categories[7].category_id, name: 'Витамины для кошек 80таб', purchase_price: 380, sale_price: 590, stock_quantity: 45, status: 'active', bonus_eligible: true, rating: 4.4 },
      { category_id: categories[7].category_id, name: 'Омега-3 для собак 60капс', purchase_price: 650, sale_price: 990, stock_quantity: 30, status: 'active', bonus_eligible: true, rating: 4.7 },
      { category_id: categories[7].category_id, name: 'Кальций для щенков 100г', purchase_price: 350, sale_price: 490, stock_quantity: 40, status: 'active', bonus_eligible: true, rating: 4.6 },
      { category_id: categories[7].category_id, name: 'Пробіотики для шлунку 50г', purchase_price: 550, sale_price: 790, stock_quantity: 25, status: 'active', bonus_eligible: true, rating: 4.5 },
      { category_id: categories[7].category_id, name: 'Захист від паразитів краплі 3шт', purchase_price: 450, sale_price: 690, stock_quantity: 60, status: 'active', bonus_eligible: true, rating: 4.6 },
      
      // Уход
      { category_id: categories[8].category_id, name: 'Шампунь для собак увлажняющий 500мл', purchase_price: 350, sale_price: 490, stock_quantity: 50, status: 'active', bonus_eligible: true, rating: 4.5 },
      { category_id: categories[8].category_id, name: 'Шампунь для кошек 300мл', purchase_price: 280, sale_price: 390, stock_quantity: 45, status: 'active', bonus_eligible: true, rating: 4.4 },
      { category_id: categories[8].category_id, name: 'Кондиционер для шерсти 400мл', purchase_price: 400, sale_price: 590, stock_quantity: 30, status: 'active', bonus_eligible: true, rating: 4.6 },
      { category_id: categories[8].category_id, name: 'Расчёска для длинной шерсти', purchase_price: 250, sale_price: 390, stock_quantity: 60, status: 'active', bonus_eligible: true, rating: 4.5 },
      { category_id: categories[8].category_id, name: 'Когтерез для кошек', purchase_price: 350, sale_price: 490, stock_quantity: 40, status: 'active', bonus_eligible: true, rating: 4.4 },
      { category_id: categories[8].category_id, name: 'Средство для чистки ушей 100мл', purchase_price: 280, sale_price: 390, stock_quantity: 35, status: 'active', bonus_eligible: true, rating: 4.5 },
      { category_id: categories[8].category_id, name: 'Паста для выведения шерсти 100г', purchase_price: 450, sale_price: 690, stock_quantity: 25, status: 'active', bonus_eligible: true, rating: 4.6 },
      
      // Корм для птиц
      { category_id: categories[2].category_id, name: 'Корм для волнистых попугайчиков 500г', purchase_price: 150, sale_price: 250, stock_quantity: 100, status: 'active', bonus_eligible: true, rating: 4.4 },
      { category_id: categories[2].category_id, name: 'Корм для канареек 400г', purchase_price: 180, sale_price: 290, stock_quantity: 80, status: 'active', bonus_eligible: true, rating: 4.5 },
      { category_id: categories[2].category_id, name: 'Лакомство для попугаев палочки 3шт', purchase_price: 120, sale_price: 190, stock_quantity: 90, status: 'active', bonus_eligible: true, rating: 4.3 },
      
      // Корм для рыб
      { category_id: categories[3].category_id, name: 'Корм для золотых рыбок 100г', purchase_price: 180, sale_price: 290, stock_quantity: 80, status: 'active', bonus_eligible: true, rating: 4.4 },
      { category_id: categories[3].category_id, name: 'Корм для тропических рыб 100г', purchase_price: 200, sale_price: 320, stock_quantity: 70, status: 'active', bonus_eligible: true, rating: 4.5 },
      { category_id: categories[3].category_id, name: 'Корм для сомов 100г', purchase_price: 220, sale_price: 350, stock_quantity: 60, status: 'active', bonus_eligible: true, rating: 4.4 },
    ];
    
    await Product.destroy({ where: {} });
    const products = await Product.bulkCreate(productsData);
    console.log('✅ Products:', products.length);
    
    // Services
    const servicesData = [
      { name: 'Груминг', description: 'Стрижка, расчёсывание, мытьё, подстрижка когтей', price: 2500, photo_url: 'https://images.pexels.com/photos/6816856/pexels-photo-6816856.jpeg' },
      { name: 'Ветеринар', description: 'Осмотр, вакцинация, лечение, консультации', price: 1500, photo_url: 'https://images.pexels.com/photos/8434728/pexels-photo-8434728.jpeg' },
      { name: 'Дрессировка', description: 'Обучение командам, коррекция поведения', price: 1200, photo_url: 'https://images.pexels.com/photos/6235233/pexels-photo-6235233.jpeg' },
      { name: 'Купание', description: 'Водные процедуры, сушка, расчесывание', price: 800, photo_url: 'https://images.pexels.com/photos/4513353/pexels-photo-4513353.jpeg' },
      { name: 'Стрижка', description: 'Профессиональная стрижка всех пород', price: 2000, photo_url: 'https://images.pexels.com/photos/6568956/pexels-photo-6568956.jpeg' },
      { name: 'Чистка зубов', description: 'Ультразвуковая чистка зубов', price: 1800, photo_url: 'https://images.pexels.com/photos/2253835/pexels-photo-2253835.jpeg' }
    ];
    
    await Service.destroy({ where: {} });
    const services = await Service.bulkCreate(servicesData);
    console.log('✅ Services:', services.length);
    
    // Animals (30+)
    const animalsData = [
      // Собаки
      { store_id: stores[0].store_id, name: 'Лабрадор', breed: 'Лабрадор ретривер', age: 12, gender: 'male', price: 35000, status: 'available', description: 'Дружелюбный, активный, отлично подходит для семьи' },
      { store_id: stores[0].store_id, name: 'Хаски', breed: 'Сибирский хаски', age: 18, gender: 'female', price: 45000, status: 'available', description: 'Энергичная, умная, требует активности' },
      { store_id: stores[0].store_id, name: 'Немецкая овчарка', breed: 'Немецкая овчарка', age: 24, gender: 'male', price: 40000, status: 'available', description: 'Преданная, умная, отличный защитник' },
      { store_id: stores[0].store_id, name: 'Йоркширский терьер', breed: 'Йоркширский терьер', age: 4, gender: 'male', price: 28000, status: 'available', description: 'Маленький, весёлый, идеальный для квартиры' },
      { store_id: stores[0].store_id, name: 'Чихуахуа', breed: 'Чихуахуа', age: 6, gender: 'female', price: 22000, status: 'available', description: 'Самая маленькая порода, компаньон' },
      { store_id: stores[0].store_id, name: 'Французский бульдог', breed: 'Французский бульдог', age: 10, gender: 'male', price: 55000, status: 'available', description: 'Добрый, игривый, не требует много активности' },
      { store_id: stores[0].store_id, name: 'Мопс', breed: 'Мопс', age: 8, gender: 'female', price: 30000, status: 'available', description: 'Добрый, спокойный, отлично подходит для детей' },
      { store_id: stores[0].store_id, name: 'Бигль', breed: 'Бигль', age: 14, gender: 'male', price: 38000, status: 'available', description: 'Энергичный, дружелюбный, любит детей' },
      { store_id: stores[0].store_id, name: 'Золотистый ретривер', breed: 'Золотистый ретривер', age: 20, gender: 'female', price: 50000, status: 'available', description: 'Очень добрый, терпеливый, семейная собака' },
      { store_id: stores[0].store_id, name: 'Ротвейлер', breed: 'Ротвейлер', age: 30, gender: 'male', price: 45000, status: 'available', description: 'Сильный, преданный, отличный защитник' },
      { store_id: stores[1].store_id, name: 'Шпиц', breed: 'Немецкий шпиц', age: 8, gender: 'female', price: 35000, status: 'available', description: 'Красивый, умный, энергичный' },
      { store_id: stores[1].store_id, name: 'Доберман', breed: 'Доберман', age: 24, gender: 'male', price: 55000, status: 'available', description: 'Элегантный, умный, сторож' },
      { store_id: stores[1].store_id, name: 'Питбуль', breed: 'Американский питбуль', age: 18, gender: 'female', price: 40000, status: 'available', description: 'Сильный, преданный, требует опытного хозяина' },
      
      // Кошки
      { store_id: stores[2].store_id, name: 'Мейнкун', breed: 'Мейн-кун', age: 8, gender: 'male', price: 55000, status: 'available', description: 'Крупный, ласковый, называют "кот-собака"' },
      { store_id: stores[2].store_id, name: 'Британская', breed: 'Британская короткошёрстная', age: 6, gender: 'female', price: 25000, status: 'available', description: 'Спокойная, независимая, красивая' },
      { store_id: stores[2].store_id, name: 'Сиамская', breed: 'Сиамская кошка', age: 10, gender: 'male', price: 28000, status: 'available', description: 'Элегантная, умная, разговорчивая' },
      { store_id: stores[2].store_id, name: 'Персидская', breed: 'Персидская кошка', age: 12, gender: 'female', price: 35000, status: 'available', description: 'Спокойная, пушистая, требует ухода' },
      { store_id: stores[2].store_id, name: 'Сфинкс', breed: 'Донской сфинкс', age: 6, gender: 'male', price: 30000, status: 'available', description: 'Без шерсти, ласковый, необычный' },
      { store_id: stores[2].store_id, name: 'Шотландская вислоухая', breed: 'Шотландская вислоухая', age: 8, gender: 'female', price: 32000, status: 'available', description: 'Милая, спокойная, с загнутыми ушами' },
      { store_id: stores[2].store_id, name: 'Бенгальская', breed: 'Бенгальская кошка', age: 10, gender: 'male', price: 45000, status: 'available', description: 'Дикая окраска, активная, умная' },
      { store_id: stores[3].store_id, name: 'Русская голубая', breed: 'Русская голубая', age: 12, gender: 'female', price: 28000, status: 'available', description: 'Серая, тихая, интеллигентная' },
      { store_id: stores[3].store_id, name: 'Абиссинская', breed: 'Абиссинская кошка', age: 6, gender: 'male', price: 35000, status: 'available', description: 'Активная, любопытная, игривая' },
      { store_id: stores[3].store_id, name: 'Манчкин', breed: 'Манчкин', age: 8, gender: 'female', price: 25000, status: 'available', description: 'Короткие лапы, милая, активная' },
      
      // Другие животные
      { store_id: stores[4].store_id, name: 'Кролик', breed: 'Декоративный кролик', age: 3, gender: 'male', price: 3000, status: 'available', description: 'Пушистый, мягкий, для детей' },
      { store_id: stores[4].store_id, name: 'Морская свинка', breed: 'Морская свинка', age: 6, gender: 'female', price: 2000, status: 'available', description: 'Дружелюбная, неприхотливая' },
      { store_id: stores[4].store_id, name: 'Хомяк', breed: 'Джунгарский хомяк', age: 1, gender: 'male', price: 500, status: 'available', description: 'Маленький, забавный, не требует много места' },
      { store_id: stores[4].store_id, name: 'Шиншилла', breed: 'Шиншилла', age: 8, gender: 'female', price: 8000, status: 'available', description: 'Мягкая шерсть, ночная активность' },
      { store_id: stores[4].store_id, name: 'Морской конёк', breed: 'Морской конёк', age: 1, gender: 'male', price: 5000, status: 'available', description: 'Экзотический, требует особого ухода' },
      { store_id: stores[5].store_id, name: 'Попугай волнистый', breed: 'Волнистый попугайчик', age: 2, gender: 'male', price: 1500, status: 'available', description: 'Поёт, говорит, активный' },
      { store_id: stores[5].store_id, name: 'Попугай Какаду', breed: 'Какаду', age: 24, gender: 'female', price: 55000, status: 'available', description: 'Крупный, умный, требует много внимания' },
      { store_id: stores[5].store_id, name: 'Амазон попугай', breed: 'Амазон', age: 36, gender: 'male', price: 80000, status: 'available', description: 'Говорит, умный, долгожитель' },
    ];
    
    await Animal.destroy({ where: {} });
    const animals = await Animal.bulkCreate(animalsData);
    console.log('✅ Animals:', animals.length);
    
    console.log('\n🎉 ВСЕ ДАННЫЕ ЗАПОЛНЕНЫ!');
    console.log('=======================');
    console.log('Users:', await User.count());
    console.log('Categories:', await Category.count());
    console.log('Stores:', await Store.count());
    console.log('Products:', await Product.count());
    console.log('Services:', await Service.count());
    console.log('Animals:', await Animal.count());
    
  } catch (e) {
    console.error('❌ Ошибка:', e.message);
  }
  process.exit(0);
}

seedAll();