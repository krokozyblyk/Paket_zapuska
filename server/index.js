require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { sequelize, User, Product, Service, Animal } = require('./models');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files (uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// API Routes
app.use('/api', routes);

// Database sync and server start
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('✅ База данных подключена');
    
    // Sync database without wiping existing data
    await sequelize.sync({ alter: false });
    console.log('✅ Структура базы данных синхронизирована');
    
    // Seed for empty DB OR missing core tables after migration
    const [usersCount, productsCount, servicesCount, animalsCount] = await Promise.all([
      User.count(),
      Product.count(),
      Service.count(),
      Animal.count(),
    ]);

    if (usersCount === 0) {
      const { seedDatabase } = require('./seeders');
      await seedDatabase();
    } else {
      console.log(`ℹ️ Данные сохранены, текущих пользователей: ${usersCount}`);
      if (productsCount === 0 || servicesCount === 0 || animalsCount === 0) {
        const { ensureBaseData } = require('./seeders/ensureBaseData');
        const res = await ensureBaseData();
        console.log('🌱 Базовые данные дозаполнены:', res?.seeded || {});
      }
    }
    
    app.listen(PORT, () => {
      console.log(`🚀 Сервер запущен на порту ${PORT}`);
      console.log(`📍 API доступен по адресу http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('❌ Ошибка запуска сервера:', error);
  }
}

startServer();

module.exports = app;
