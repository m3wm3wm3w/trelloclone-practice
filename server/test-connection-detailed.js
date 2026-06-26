require('dotenv').config();
const mongoose = require('mongoose');

console.log('🔍 Детальная проверка подключения к MongoDB...\n');
console.log('📍 Проверяем переменные окружения:');
console.log('   PORT:', process.env.PORT);
console.log('   MONGODB_URI:', process.env.MONGODB_URI ? 'Установлен ✓' : 'НЕ установлен ✗');
console.log('   JWT_SECRET:', process.env.JWT_SECRET ? 'Установлен ✓' : 'НЕ установлен ✗');
console.log('\n📍 URI (с маскировкой пароля):');
console.log('   ', process.env.MONGODB_URI?.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@'));

console.log('\n🔄 Попытка подключения...');

const options = {
  serverSelectionTimeoutMS: 5000,
};

mongoose.connect(process.env.MONGODB_URI, options)
  .then(() => {
    console.log('\n✅ УСПЕШНО! Подключено к MongoDB Atlas!');
    console.log('📦 База данных:', mongoose.connection.name);
    console.log('🌐 Хост:', mongoose.connection.host);
    console.log('📊 Состояние:', mongoose.connection.readyState === 1 ? 'Подключено' : 'Отключено');
    mongoose.connection.close();
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ ОШИБКА подключения:');
    console.error('   Тип ошибки:', error.name);
    console.error('   Сообщение:', error.message);
    
    if (error.message.includes('bad auth')) {
      console.log('\n💡 Проблема с аутентификацией. Проверьте:');
      console.log('   1. Username и password правильные');
      console.log('   2. Пользователь создан в Database Access');
      console.log('   3. Пользователь имеет права "Read and write"');
      console.log('   4. Подождите 1-2 минуты после создания пользователя');
    } else if (error.message.includes('ENOTFOUND')) {
      console.log('\n💡 Кластер не найден. Проверьте:');
      console.log('   1. Адрес кластера правильный (cluster0.qqqfbdi.mongodb.net)');
      console.log('   2. Кластер существует и активен');
    } else if (error.message.includes('timeout')) {
      console.log('\n💡 Тайм-аут подключения. Проверьте:');
      console.log('   1. IP адрес разрешен (0.0.0.0/0 в Network Access)');
      console.log('   2. Интернет соединение работает');
    }
    
    console.log('\n📖 См. MONGODB_SETUP.md для подробной инструкции');
    process.exit(1);
  });

// Таймаут на случай зависания
setTimeout(() => {
  console.log('\n⏱️  Превышено время ожидания (10 секунд)');
  process.exit(1);
}, 10000);
