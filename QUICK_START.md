# 🚀 Быстрый старт

## Что уже сделано ✅

1. ✅ Backend API (Node.js + Express + Socket.io)
2. ✅ Frontend (React + Redux)
3. ✅ Все модели и маршруты
4. ✅ Real-time функционал
5. ✅ 6 осмысленных Git коммитов
6. ✅ Полная документация

## Локальный репозиторий

📁 **Путь:** `C:\Users\Abyss\OneDrive\Рабочий стол\trello clone`

### Git коммиты:
```
ca3f10a - docs: add comprehensive project summary
daebea6 - docs: add GitHub setup and deployment instructions
7ba4e43 - docs: add features list and contributing guide
93ae602 - docs: add comprehensive documentation and configuration
cd7ac32 - feat: implement React frontend with Redux and Socket.io
35365c0 - feat: initial backend setup with Express, MongoDB, and Socket.io
```

## ⚠️ MongoDB не установлен

У вас нет локального MongoDB. Есть 2 варианта:

### Вариант 1: MongoDB Atlas (Рекомендуется - быстрее)

1. Зайдите на https://www.mongodb.com/cloud/atlas
2. Создайте бесплатный аккаунт
3. Создайте кластер (выберите FREE tier)
4. В Security → Database Access создайте пользователя
5. В Security → Network Access добавьте IP: `0.0.0.0/0`
6. Получите connection string (кнопка Connect → Drivers)
7. Обновите `.env` файл:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/trello-clone?retryWrites=true&w=majority
```

### Вариант 2: Установить MongoDB локально

1. Скачайте с https://www.mongodb.com/try/download/community
2. Установите MongoDB
3. Запустите службу MongoDB
4. URI в `.env` останется: `mongodb://localhost:27017/trello-clone`

## 📝 Запуск проекта

После настройки MongoDB:

### 1. Запуск в режиме разработки (оба сервера)

```bash
npm run dev
```

- Backend: http://localhost:5000
- Frontend: http://localhost:3000

### 2. Или запускайте отдельно

**Backend:**
```bash
npm run server
```

**Frontend (в новом терминале):**
```bash
npm run client
```

## 🧪 Тестирование

1. Откройте http://localhost:3000
2. Нажмите "Sign Up"
3. Создайте аккаунт:
   - First Name: Test
   - Last Name: User
   - Email: test@example.com
   - Password: test123
4. Создайте доску
5. Добавьте списки и карточки
6. Откройте в двух вкладках для проверки real-time

## 📤 Публикация на GitHub

### 1. Создайте репозиторий на GitHub

1. Зайдите на https://github.com
2. Нажмите "New repository"
3. Название: `trello-clone`
4. Visibility: Public
5. ❌ НЕ добавляйте README/License (уже есть)
6. Нажмите "Create repository"

### 2. Подключите локальный репозиторий

В терминале выполните (замените YOUR_USERNAME):

```bash
git remote add origin https://github.com/YOUR_USERNAME/trello-clone.git
git branch -M main
git push -u origin main
```

## 🚀 Деплой

### Backend на Render

1. https://render.com → New → Web Service
2. Подключите GitHub репозиторий
3. Настройки:
   - Build: `npm install`
   - Start: `node server/index.js`
4. Environment Variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_atlas_uri
   JWT_SECRET=random_secret_key
   NODE_ENV=production
   CLIENT_URL=https://your-frontend.vercel.app
   ```

### Frontend на Vercel

1. https://vercel.com → New Project
2. Подключите репозиторий
3. Настройки:
   - Root Directory: `client`
   - Framework: Create React App
4. Environment Variables:
   ```
   REACT_APP_API_URL=https://your-backend.onrender.com
   REACT_APP_SOCKET_URL=https://your-backend.onrender.com
   ```

## 📊 Code Climate (для оценки 4-5)

1. https://codeclimate.com
2. Sign in with GitHub
3. Add repository → trello-clone
4. Скопируйте Maintainability Badge
5. Замените в README.md

## 📝 Отчет

Заполните отчет по шаблону:

1. **Выбранный проект:**
   - Название: Trello Clone
   - Ссылка: https://bigardone.dev/blog/2016/01/04/trello-tribute-with-phoenix-and-react-pt-1/

2. **Технический паспорт:**
   - GitHub: your-repo-url
   - Деплой: your-vercel-url
   - Стек: Node.js, Express, MongoDB, React, Redux, Socket.io
   - Login: test@example.com
   - Password: test123

3. **Таблица соответствия:**
   | Функция | Файл | Деплой |
   |---------|------|--------|
   | Регистрация | server/routes/auth.js | /signup |
   | Создание доски | server/routes/boards.js | /boards |
   | И т.д. | | |

## ✅ Чек-лист перед сдачей

- [ ] MongoDB подключен (Atlas или локально)
- [ ] Проект запускается локально
- [ ] Создан тестовый аккаунт
- [ ] Репозиторий на GitHub
- [ ] Code Climate настроен
- [ ] Backend задеплоен
- [ ] Frontend задеплоен
- [ ] Отчет заполнен
- [ ] Всё работает в деплое

## 🆘 Помощь

### Проект не запускается?
- Проверьте `.env` файл
- Убедитесь что MongoDB запущен
- Посмотрите ошибки в терминале

### Ошибки с зависимостями?
```bash
npm run install-all
```

### Нужна помощь?
- Посмотрите документацию в папке проекта
- Проверьте API_DOCUMENTATION.md для API
- Смотрите ARCHITECTURE.md для архитектуры
