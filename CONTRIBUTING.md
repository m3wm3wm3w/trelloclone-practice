# Contributing Guide

## Структура проекта

```
trello-clone/
├── server/              # Backend (Node.js + Express)
│   ├── models/         # Mongoose модели
│   ├── routes/         # API маршруты
│   ├── middleware/     # Express middleware
│   └── index.js        # Главный файл сервера
├── client/             # Frontend (React + Redux)
│   ├── public/         # Статические файлы
│   └── src/
│       ├── components/ # React компоненты
│       ├── pages/      # Страницы
│       ├── redux/      # Redux store и slices
│       ├── services/   # API и Socket.io сервисы
│       └── styles/     # SCSS стили
├── .env                # Environment variables (не в Git)
├── .env.example        # Пример environment variables
└── package.json        # Root package.json
```

## Локальная разработка

### Требования
- Node.js v14 или выше
- MongoDB (локально или MongoDB Atlas)
- Git

### Первоначальная настройка

1. Клонируйте репозиторий:
```bash
git clone <your-repo-url>
cd trello-clone
```

2. Установите зависимости:
```bash
npm run install-all
```

3. Настройте переменные окружения:
```bash
cp .env.example .env
# Отредактируйте .env файл
```

4. Запустите MongoDB (если локально):
```bash
mongod
```

5. Запустите dev серверы:
```bash
npm run dev
```

Backend: http://localhost:5000  
Frontend: http://localhost:3000

## Git Workflow

### Коммиты

Используйте conventional commits:
- `feat:` - новая функция
- `fix:` - исправление бага
- `docs:` - изменения документации
- `style:` - форматирование кода
- `refactor:` - рефакторинг
- `test:` - добавление тестов
- `chore:` - обновление зависимостей и т.д.

Пример:
```bash
git commit -m "feat: add card drag and drop functionality"
```

### Branching

- `main/master` - production ветка
- `develop` - development ветка
- `feature/название` - ветки для новых функций
- `fix/название` - ветки для исправлений

## Добавление новых функций

### Backend

1. Создайте или обновите модель в `server/models/`
2. Добавьте маршруты в `server/routes/`
3. Добавьте middleware если нужно
4. Обновите Socket.io events если нужно

### Frontend

1. Создайте или обновите Redux slice в `client/src/redux/slices/`
2. Создайте компонент в `client/src/components/` или страницу в `client/src/pages/`
3. Добавьте стили в `client/src/styles/`
4. Обновите маршруты в `App.js` если нужно

## Тестирование

### Ручное тестирование
1. Запустите приложение локально
2. Протестируйте новую функцию
3. Проверьте в разных браузерах
4. Проверьте real-time функционал в нескольких вкладках

### Автоматическое тестирование (TODO)
```bash
npm test
```

## Code Style

- Используйте ES6+ синтаксис
- Следуйте React best practices
- Используйте функциональные компоненты и hooks
- Комментируйте сложную логику
- Именуйте переменные и функции описательно

## Pull Request Process

1. Создайте feature ветку
2. Сделайте ваши изменения
3. Убедитесь что код работает
4. Создайте Pull Request с описанием изменений
5. Дождитесь review

## Вопросы?

Создайте Issue в GitHub репозитории.
