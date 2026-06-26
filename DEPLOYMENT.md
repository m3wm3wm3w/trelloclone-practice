# Руководство по деплою

## Подготовка к деплою

### 1. Backend деплой (Render/Railway/Heroku)

#### Render (рекомендуется)

1. Создайте аккаунт на [render.com](https://render.com)

2. Создайте новый Web Service:
   - Connect your GitHub repository
   - Name: `trello-clone-api`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`

3. Добавьте environment variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_atlas_uri
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=production
   CLIENT_URL=your_frontend_url
   ```

4. Получите URL вашего backend (например: `https://trello-clone-api.onrender.com`)

### 2. MongoDB Atlas

1. Создайте бесплатный кластер на [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

2. Создайте database user с паролем

3. Добавьте IP адрес в whitelist (0.0.0.0/0 для разрешения всех)

4. Получите connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/trello-clone
   ```

5. Используйте этот string в переменной `MONGODB_URI`

### 3. Frontend деплой (Vercel/Netlify)

#### Vercel (рекомендуется)

1. Установите Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. В папке `client` создайте файл `.env.production`:
   ```
   REACT_APP_API_URL=https://your-backend-url.onrender.com
   REACT_APP_SOCKET_URL=https://your-backend-url.onrender.com
   ```

3. Деплой:
   ```bash
   cd client
   vercel --prod
   ```

4. Или через GitHub:
   - Подключите репозиторий к Vercel
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Environment Variables: добавьте переменные из `.env.production`

### 4. Обновление backend переменной CLIENT_URL

После деплоя frontend, обновите переменную `CLIENT_URL` на backend на URL вашего frontend.

## Проверка деплоя

1. Откройте frontend URL в браузере
2. Попробуйте зарегистрироваться
3. Создайте доску
4. Откройте доску в двух вкладках и проверьте real-time обновления

## Альтернативные платформы

### Railway
- Поддерживает Node.js и MongoDB
- Автоматический деплой из GitHub
- Бесплатный tier доступен

### Heroku
- Требует credit card для dyno
- Поддерживает MongoDB Atlas
- Простая настройка через CLI

### Netlify
- Альтернатива Vercel для frontend
- Drag & drop деплой
- Автоматические деплои из GitHub

## Troubleshooting

### CORS ошибки
Убедитесь, что `CLIENT_URL` на backend правильно настроен и включает ваш frontend URL.

### Socket.io не подключается
Проверьте, что `REACT_APP_SOCKET_URL` указывает на правильный backend URL с https://.

### MongoDB connection failed
Проверьте:
- Connection string правильный
- IP whitelist включает 0.0.0.0/0 или IP вашего сервера
- Database user существует и пароль правильный
