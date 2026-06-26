# Руководство по деплою

## 🚀 Пошаговая инструкция

### Шаг 1: Деплой Backend на Render.com

1. **Зайдите на [render.com](https://render.com)** и войдите через GitHub

2. **Нажмите "New +" → "Web Service"**

3. **Подключите репозиторий:**
   - Найдите `m3wm3wm3w/trelloclone-practice`
   - Нажмите "Connect"

4. **Настройте сервис:**
   - **Name:** `trello-clone-api`
   - **Environment:** `Node`
   - **Region:** Frankfurt (EU Central) или ближайший
   - **Branch:** `main`
   - **Build Command:** `npm install`
   - **Start Command:** `node server/index.js`
   - **Instance Type:** Free

5. **Добавьте Environment Variables (очень важно!):**
   Нажмите "Advanced" → "Add Environment Variable"
   
   ```
   NODE_ENV = production
   PORT = 5000
   MONGODB_URI = mongodb+srv://trello:trello123@cluster0.jbcgkly.mongodb.net/trello-clone?retryWrites=true&w=majority
   JWT_SECRET = your_super_secret_jwt_key_here_min_32_chars
   CLIENT_URL = https://your-app.vercel.app
   ```
   
   ⚠️ **CLIENT_URL** обновите после деплоя frontend!

6. **Нажмите "Create Web Service"**
   
   Деплой займет 3-5 минут. После завершения скопируйте URL (например: `https://trello-clone-api.onrender.com`)

7. **Проверьте работу:**
   Откройте `https://your-backend-url.onrender.com/api/auth/login` - должна быть страница с ошибкой (это нормально, значит сервер работает)

### Шаг 2: Деплой Frontend на Vercel.com

1. **Зайдите на [vercel.com](https://vercel.com)** и войдите через GitHub

2. **Нажмите "Add New..." → "Project"**

3. **Import репозиторий:**
   - Найдите `m3wm3wm3w/trelloclone-practice`
   - Нажмите "Import"

4. **Настройте проект:**
   - **Framework Preset:** Create React App
   - **Root Directory:** `client` ← ВАЖНО!
   - **Build Command:** `npm run build` (автоматически)
   - **Output Directory:** `build` (автоматически)

5. **Добавьте Environment Variables:**
   Разверните "Environment Variables" и добавьте:
   
   ```
   REACT_APP_API_URL = https://your-backend-url.onrender.com
   REACT_APP_SOCKET_URL = https://your-backend-url.onrender.com
   ```
   
   ⚠️ Используйте URL backend из Шага 1!

6. **Нажмите "Deploy"**
   
   Деплой займет 1-2 минуты. После завершения получите URL (например: `https://trelloclone-practice.vercel.app`)

7. **Проверьте работу:**
   Откройте ваш Vercel URL - должна открыться страница входа

### Шаг 3: Обновите CLIENT_URL на Backend

⚠️ **Критически важно для работы CORS!**

1. Вернитесь в Render.com → ваш Web Service
2. Перейдите в "Environment"
3. Найдите переменную `CLIENT_URL`
4. Обновите на ваш Vercel URL: `https://your-app.vercel.app`
5. Сохраните - сервис автоматически перезапустится

### Шаг 4: Финальная проверка

1. Откройте ваш Vercel URL
2. Зарегистрируйте нового пользователя
3. Создайте доску
4. Добавьте список и карточку
5. Откройте в двух вкладках - проверьте real-time

✅ Если всё работает - деплой готов!

---

## 📝 MongoDB Atlas (уже настроен)

Ваш MongoDB уже работает:
- **Cluster:** cluster0.jbcgkly.mongodb.net
- **User:** trello / trello123
- **Database:** trello-clone
- **Connection String:** уже добавлен в Render

---

## 🔍 Troubleshooting

### Backend не запускается на Render
**Проверьте:**
- Build Command: `npm install`
- Start Command: `node server/index.js` (не `npm start`)
- Все environment variables добавлены
- MongoDB connection string правильный

### Frontend показывает ошибки подключения
**Проверьте:**
- `REACT_APP_API_URL` в Vercel указывает на backend
- `REACT_APP_SOCKET_URL` в Vercel указывает на backend
- URL начинается с `https://` (не http)
- CLIENT_URL на backend указывает на Vercel URL

### CORS ошибки
**Решение:**
- Убедитесь что CLIENT_URL на backend = Vercel URL
- Проверьте что в `server/index.js` CORS настроен правильно
- Перезапустите backend service на Render

### Socket.io не подключается
**Проверьте:**
- `REACT_APP_SOCKET_URL` указывает на backend с https://
- Backend работает (откройте backend URL в браузере)
- В консоли браузера нет ошибок CORS

### MongoDB connection failed
**Проверьте:**
- Connection string правильный (из шага 1)
- IP whitelist в MongoDB Atlas: 0.0.0.0/0
- Username и password правильные

### Render Free Instance спит
**Важно знать:**
- Free instances "засыпают" после 15 минут неактивности
- Первый запрос может занять 30-60 секунд
- Для production используйте платный план

---

## 📋 Ваши URLs после деплоя

Сохраните для отчета:

- **GitHub:** https://github.com/m3wm3wm3w/trelloclone-practice
- **Backend (Render):** https://your-backend.onrender.com
- **Frontend (Vercel):** https://your-frontend.vercel.app
- **MongoDB:** cluster0.jbcgkly.mongodb.net

---

## ⏭️ Следующие шаги

После успешного деплоя:

1. ✅ Обновите README.md с реальной ссылкой на деплой
2. ✅ Настройте Code Climate для бейджа
3. ✅ Запишите демонстрацию (GIF/видео)
4. ✅ Создайте отчет по шаблону

---
