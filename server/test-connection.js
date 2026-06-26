require('dotenv').config();
const mongoose = require('mongoose');

console.log('🔍 Проверка подключения к MongoDB...');
console.log('📍 URI:', process.env.MONGODB_URI?.replace(/\/\/([^:]+):([^@]+)@/, '//****:****@'));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Успешно подключено к MongoDB Atlas!');
    console.log('📦 База данных готова к работе');
    mongoose.connection.close();
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Ошибка подключения к MongoDB:');
    console.error(error.message);
    console.log('\n💡 Проверьте:');
    console.log('   1. Connection string в .env файле');
    console.log('   2. Замените <password> на реальный пароль');
    console.log('   3. IP адрес разрешен на MongoDB Atlas');
    console.log('   4. Database user создан');
    console.log('\n📖 См. MONGODB_SETUP.md для подробной инструкции');
    process.exit(1);
  });
