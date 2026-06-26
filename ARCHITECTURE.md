# Архитектура проекта Trello Clone

## Общая структура

Проект следует клиент-серверной архитектуре с real-time коммуникацией:

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│   React Client  │ ◄────► │  Express Server │ ◄────► │    MongoDB      │
│  (Redux Store)  │  HTTP   │   (REST API)    │         │   (Database)    │
└─────────────────┘  WebSocket├─────────────────┤         └─────────────────┘
        │                   │   Socket.io      │
        └──────────────────►│  (Real-time)     │
                            └──────────────────┘
```

## Backend (Node.js + Express + MongoDB)

### Модели данных (Mongoose Schemas)

#### User
- `email` (String, unique) - Email пользователя
- `password` (String, hashed) - Хешированный пароль
- `firstName` (String) - Имя
- `lastName` (String) - Фамилия
- `createdAt` (Date) - Дата регистрации

#### Board
- `name` (String) - Название доски
- `owner` (ObjectId → User) - Владелец доски
- `members` ([ObjectId] → User) - Участники доски
- `createdAt` (Date) - Дата создания

#### List
- `name` (String) - Название списка
- `board` (ObjectId → Board) - Родительская доска
- `position` (Number) - Позиция списка
- `createdAt` (Date) - Дата создания

#### Card
- `name` (String) - Название карточки
- `description` (String) - Описание
- `list` (ObjectId → List) - Родительский список
- `position` (Number) - Позиция карточки
- `createdAt` (Date) - Дата создания

### API Endpoints

#### Аутентификация
- `POST /api/auth/register` - Регистрация
- `POST /api/auth/login` - Вход
- `GET /api/auth/me` - Получить текущего пользователя

#### Доски
- `GET /api/boards` - Получить все доски пользователя
- `GET /api/boards/:id` - Получить доску по ID
- `POST /api/boards` - Создать доску
- `POST /api/boards/:id/members` - Добавить участника
- `DELETE /api/boards/:id` - Удалить доску

#### Списки
- `POST /api/lists` - Создать список
- `PUT /api/lists/:id` - Обновить список
- `DELETE /api/lists/:id` - Удалить список

#### Карточки
- `POST /api/cards` - Создать карточку
- `PUT /api/cards/:id` - Обновить карточку
- `PUT /api/cards/:id/move` - Переместить карточку
- `DELETE /api/cards/:id` - Удалить карточку

### Socket.io Events

**Client → Server:**
- `join:board` - Присоединиться к доске
- `leave:board` - Покинуть доску

**Server → Client:**
- `user:joined` - Пользователь присоединился
- `user:left` - Пользователь отключился
- `list:created` - Создан список
- `card:created` - Создана карточка
- `card:updated` - Обновлена карточка
- `card:deleted` - Удалена карточка

## Frontend (React + Redux)

### Redux Store Structure

```javascript
{
  auth: {
    user: User | null,
    loading: boolean,
    error: string | null
  },
  boards: {
    ownedBoards: Board[],
    memberBoards: Board[],
    loading: boolean,
    error: string | null
  },
  currentBoard: {
    board: Board | null,
    lists: List[],
    cards: Card[],
    connectedUsers: string[],
    loading: boolean,
    error: string | null
  }
}
```

### Компоненты

#### Pages
- `SignIn` - Страница входа
- `SignUp` - Страница регистрации
- `Boards` - Список досок пользователя
- `Board` - Просмотр и редактирование доски

#### Components
- `List` - Список с карточками
- `Card` - Карточка задачи
- `ConnectedUsers` - Список подключенных пользователей

### Роутинг

- `/signin` - Вход (неавторизованные)
- `/signup` - Регистрация (неавторизованные)
- `/` - Главная страница с досками (авторизованные)
- `/boards/:id` - Просмотр доски (авторизованные)

## Безопасность

1. **JWT Authentication** - Токены для аутентификации
2. **Password Hashing** - bcrypt для хеширования паролей
3. **Authorization Middleware** - Проверка прав доступа
4. **Input Validation** - express-validator для валидации
5. **CORS Configuration** - Настроенный CORS для клиента

## Real-time Features

- Автоматическое обновление при создании списков
- Автоматическое обновление при создании/редактировании карточек
- Отображение подключенных пользователей в реальном времени
- Синхронизация изменений между всеми подключенными клиентами
