require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Board = require('./models/Board');

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Подключено к MongoDB');

    // Очистка базы данных
    await User.deleteMany({});
    await Board.deleteMany({});
    console.log('🗑️  База данных очищена');

    // Создание тестовых пользователей
    const user1 = await User.create({
      email: 'test@example.com',
      password: 'test123',
      firstName: 'Тест',
      lastName: 'Пользователь'
    });

    const user2 = await User.create({
      email: 'john@example.com',
      password: 'john123',
      firstName: 'Иван',
      lastName: 'Иванов'
    });

    console.log('👤 Созданы тестовые пользователи:');
    console.log('   Email: test@example.com, Password: test123');
    console.log('   Email: john@example.com, Password: john123');

    // Создание тестовой доски
    const board = await Board.create({
      name: 'Моя первая доска',
      owner: user1._id,
      members: [user2._id]
    });

    console.log('📋 Создана тестовая доска:', board.name);
    console.log('✅ Заполнение базы данных завершено!');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Ошибка:', error);
    process.exit(1);
  }
};

seedDatabase();
