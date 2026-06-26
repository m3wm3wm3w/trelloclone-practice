# 🍃 Подключение MongoDB Atlas

## Шаг 1: Регистрация

1. Откройте https://www.mongodb.com/cloud/atlas/register
2. Зарегистрируйтесь через Google/GitHub или email
3. Подтвердите email (если нужно)

## Шаг 2: Создание кластера (FREE)

1. После входа выберите **"Build a Database"**
2. Выберите **FREE tier** (M0 Sandbox)
   - Provider: AWS
   - Region: выберите ближайший (например, Frankfurt)
3. Cluster Name: можете оставить `Cluster0` или назвать `trello-cluster`
4. Нажмите **"Create"** (займет 3-5 минут)

## Шаг 3: Настройка безопасности

### 3.1 Создайте Database User

1. Выберите **"Database Access"** в левом меню
2. Нажмите **"Add New Database User"**
3. Authentication Method: **Password**
4. Введите:
   - Username: `trello` (или любое имя)
   - Password: `trello123` (или создайте автоматический)
   - **ВАЖНО:** Запомните/запишите эти данные!
5. Database User Privileges: **Read and write to any database**
6. Нажмите **"Add User"**

### 3.2 Разрешите доступ с вашего IP

1. Выберите **"Network Access"** в левом меню
2. Нажмите **"Add IP Address"**
3. Выберите **"Allow Access from Anywhere"** (0.0.0.0/0)
   - Это безопасно, так как доступ защищен паролем
4. Нажмите **"Confirm"**

## Шаг 4: Получите Connection String

1. Вернитесь в **"Database"** (главная страница)
2. Ваш кластер должен быть готов (зеленая галочка)
3. Нажмите **"Connect"**
4. Выберите **"Drivers"**
5. Driver: **Node.js**, Version: **4.1 or later**
6. Скопируйте Connection String:

```
mongodb+srv://trello:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

7. **ВАЖНО:** Замените `<password>` на ваш реальный пароль!

Пример:
```
mongodb+srv://trello:trello123@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

## Шаг 5: Обновите .env файл

Откройте файл `.env` в корне проекта и вставьте ваш connection string:

```env
PORT=5000
MONGODB_URI=mongodb+srv://trello:trello123@cluster0.xxxxx.mongodb.net/trello-clone?retryWrites=true&w=majority
JWT_SECRET=trello_clone_secret_key_2024_super_secure
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

**ВАЖНО:** Добавьте `/trello-clone` после `.net/` - это название вашей базы данных!

## Шаг 6: Проверьте подключение

Откройте терминал и выполните:

```bash
# Заполните базу тестовыми данными
npm run seed
```

Вы должны увидеть:
```
✅ Подключено к MongoDB
🗑️  База данных очищена
👤 Созданы тестовые пользователи:
   Email: test@example.com, Password: test123
   Email: john@example.com, Password: john123
📋 Создана тестовая доска: Моя первая доска
✅ Заполнение базы данных завершено!
```

## Шаг 7: Запустите проект

```bash
npm run dev
```

Сервер запустится на http://localhost:5000 (backend)
Клиент на http://localhost:3000 (frontend)

## 🎉 Готово!

Теперь можете:
1. Открыть http://localhost:3000
2. Войти через test@example.com / test123
3. Создать доски и карточки
4. Открыть в двух вкладках для проверки real-time

## 📊 Просмотр данных в MongoDB

1. На странице Database нажмите **"Browse Collections"**
2. Выберите базу `trello-clone`
3. Увидите коллекции: users, boards, lists, cards

## ❓ Проблемы?

### Ошибка подключения:
- Проверьте, что заменили `<password>` на реальный пароль
- Проверьте, что добавили `/trello-clone` после `.net/`
- Убедитесь, что IP адрес разрешен (0.0.0.0/0)

### Ошибка аутентификации:
- Проверьте username и password в connection string
- Проверьте, что user создан в Database Access

### Кластер не создается:
- Подождите 3-5 минут
- Обновите страницу
- Проверьте email на подтверждение

---

## 🔒 Безопасность

Для production:
1. Не используйте простые пароли
2. Не комитьте `.env` файл в Git (уже в .gitignore)
3. Используйте конкретные IP адреса вместо 0.0.0.0/0
4. Создайте отдельного пользователя с ограниченными правами
