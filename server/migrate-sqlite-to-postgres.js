const { sequelize: sqlite } = require('./models');
const { sequelize: postgres, User, Category, Store, Animal, ZooPassport, AnimalPhoto, Service, Product, ProductPhoto, Promotion, Cart, Favorite, Review, Notification, Order, OrderItem, BonusTransaction, ServiceBooking, AnimalReservation } = require('./models');

async function migrate() {
  console.log('🔄 Миграция данных из SQLite в PostgreSQL...\n');
  
  try {
    await sqlite.authenticate();
    await postgres.authenticate();
    console.log('✅ Оба подключения работают\n');
    
    // User
    const users = await User.findAll();
    console.log(`User: ${users.length} -> `);
    await User.destroy({ where: {} });
    for (const u of users) await User.create(u.toJSON());
    console.log('✅');
    
    // Category
    const categories = await Category.findAll();
    console.log(`Category: ${categories.length} -> `);
    await Category.destroy({ where: {} });
    for (const c of categories) await Category.create(c.toJSON());
    console.log('✅');
    
    // Store - без latitude/longitude
    const stores = await Store.findAll({ attributes: ['store_id', 'name', 'address', 'rating', 'working_hours'] });
    console.log(`Store: ${stores.length} -> `);
    await Store.destroy({ where: {} });
    for (const s of stores) await Store.create(s.toJSON());
    console.log('✅');
    
    // Animal
    const animals = await Animal.findAll();
    console.log(`Animal: ${animals.length} -> `);
    await Animal.destroy({ where: {} });
    for (const a of animals) await Animal.create(a.toJSON());
    console.log('✅');
    
    // ZooPassport
    const passports = await ZooPassport.findAll();
    console.log(`ZooPassport: ${passports.length} -> `);
    await ZooPassport.destroy({ where: {} });
    for (const p of passports) await ZooPassport.create(p.toJSON());
    console.log('✅');
    
    // AnimalPhoto
    const animalPhotos = await AnimalPhoto.findAll();
    console.log(`AnimalPhoto: ${animalPhotos.length} -> `);
    await AnimalPhoto.destroy({ where: {} });
    for (const p of animalPhotos) await AnimalPhoto.create(p.toJSON());
    console.log('✅');
    
    // Service
    const services = await Service.findAll();
    console.log(`Service: ${services.length} -> `);
    await Service.destroy({ where: {} });
    for (const s of services) await Service.create(s.toJSON());
    console.log('✅');
    
    // Product
    const products = await Product.findAll();
    console.log(`Product: ${products.length} -> `);
    await Product.destroy({ where: {} });
    for (const p of products) await Product.create(p.toJSON());
    console.log('✅');
    
    // ProductPhoto
    const productPhotos = await ProductPhoto.findAll();
    console.log(`ProductPhoto: ${productPhotos.length} -> `);
    await ProductPhoto.destroy({ where: {} });
    for (const p of productPhotos) await ProductPhoto.create(p.toJSON());
    console.log('✅');
    
    // Promotion
    const promotions = await Promotion.findAll();
    console.log(`Promotion: ${promotions.length} -> `);
    await Promotion.destroy({ where: {} });
    for (const p of promotions) await Promotion.create(p.toJSON());
    console.log('✅');
    
    // Cart
    const carts = await Cart.findAll();
    console.log(`Cart: ${carts.length} -> `);
    await Cart.destroy({ where: {} });
    for (const c of carts) await Cart.create(c.toJSON());
    console.log('✅');
    
    // Favorite
    const favorites = await Favorite.findAll();
    console.log(`Favorite: ${favorites.length} -> `);
    await Favorite.destroy({ where: {} });
    for (const f of favorites) await Favorite.create(f.toJSON());
    console.log('✅');
    
    // Review
    const reviews = await Review.findAll();
    console.log(`Review: ${reviews.length} -> `);
    await Review.destroy({ where: {} });
    for (const r of reviews) await Review.create(r.toJSON());
    console.log('✅');
    
    // Notification
    const notifications = await Notification.findAll();
    console.log(`Notification: ${notifications.length} -> `);
    await Notification.destroy({ where: {} });
    for (const n of notifications) await Notification.create(n.toJSON());
    console.log('✅');
    
    // Order
    const orders = await Order.findAll();
    console.log(`Order: ${orders.length} -> `);
    await Order.destroy({ where: {} });
    for (const o of orders) await Order.create(o.toJSON());
    console.log('✅');
    
    // OrderItem
    const orderItems = await OrderItem.findAll();
    console.log(`OrderItem: ${orderItems.length} -> `);
    await OrderItem.destroy({ where: {} });
    for (const o of orderItems) await OrderItem.create(o.toJSON());
    console.log('✅');
    
    // BonusTransaction
    const bonusTransactions = await BonusTransaction.findAll();
    console.log(`BonusTransaction: ${bonusTransactions.length} -> `);
    await BonusTransaction.destroy({ where: {} });
    for (const b of bonusTransactions) await BonusTransaction.create(b.toJSON());
    console.log('✅');
    
    // ServiceBooking
    const serviceBookings = await ServiceBooking.findAll();
    console.log(`ServiceBooking: ${serviceBookings.length} -> `);
    await ServiceBooking.destroy({ where: {} });
    for (const s of serviceBookings) await ServiceBooking.create(s.toJSON());
    console.log('✅');
    
    // AnimalReservation
    const animalReservations = await AnimalReservation.findAll();
    console.log(`AnimalReservation: ${animalReservations.length} -> `);
    await AnimalReservation.destroy({ where: {} });
    for (const a of animalReservations) await AnimalReservation.create(a.toJSON());
    console.log('✅');
    
    console.log('\n🎉 Миграция завершена!');
    
  } catch (e) {
    console.error('\n❌ Ошибка:', e.message);
  } finally {
    process.exit(0);
  }
}

migrate();