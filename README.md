# Trello Clone

Клон популярного приложения Trello, созданный в рамках учебного проекта по гайду [Trello tribute with Phoenix and React](https://bigardone.dev/blog/2016/01/04/trello-tribute-with-phoenix-and-react-pt-1/).

## Описание проекта

Это одностраничное приложение (SPA), которое позволяет пользователям:
- Регистрироваться и входить в систему
- Создавать доски (boards)
- Делиться досками с другими пользователями
- Добавлять списки (lists) и карточки (cards) на доски
- Видеть подключенных пользователей в реальном времени
- Автоматически получать обновления на всех подключенных устройствах

## Технологический стек

**Backend:**
- Node.js
- Express
- MongoDB + Mongoose
- Socket.io (для real-time функционала)
- JWT (аутентификация)

**Frontend:**
- React
- Redux (управление состоянием)
- React Router (маршрутизация)
- Socket.io-client (real-time)
- Sass (стили)

## Как запустить локально

### Требования
- Node.js (v14+)
- MongoDB (локально или MongoDB Atlas)

### Установка

1. Клонируйте репозиторий:
```bash
git clone <repository-url>
cd trello-clone
```

2. Установите зависимости для сервера и клиента:
```bash
npm run install-all
```

3. Создайте файл `.env` в корне проекта:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/trello-clone
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

4. Запустите MongoDB (если используете локальную установку)

5. Запустите проект в режиме разработки:
```bash
npm run dev
```

Сервер запустится на `http://localhost:5000`, клиент на `http://localhost:3000`

## Деплой

🔗 [Ссылка на работающее приложение](#) _(будет добавлена после деплоя)_

## Code Quality

[![Maintainability](https://api.codeclimate.com/v1/badges/placeholder/maintainability)](https://codeclimate.com/github/placeholder)

## Лицензия

MIT
