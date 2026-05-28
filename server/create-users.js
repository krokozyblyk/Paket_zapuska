const bcrypt = require('bcrypt');
const { sequelize } = require('./models');

(async () => {
  try {
    const hashedPassword = await bcrypt.hash('Password1', 10);
    console.log('Creating users with hash...');
    
    await sequelize.query('DELETE FROM users');
    await sequelize.query(`
      INSERT INTO users (last_name, first_name, email, password_hash, role, bonus_balance) VALUES 
      ('Админов', 'Админ', 'admin@prizma.ru', '${hashedPassword}', 'admin', 0),
      ('Иванов', 'Иван', 'client@mail.ru', '${hashedPassword}', 'client', 150),
      ('Петрова', 'Анна', 'anna@mail.ru', '${hashedPassword}', 'client', 50)
    `);
    
    console.log('✅ Users created!');
    
    // Тест входа
    const r = await require('axios').post('http://localhost:5000/api/auth/login', {
      email: 'admin@prizma.ru',
      password: 'Password1'
    });
    console.log('✅ Admin login OK, role:', r.data.user.role);
    
  } catch (e) {
    console.log('❌ Error:', e.message);
  }
  process.exit(0);
})();