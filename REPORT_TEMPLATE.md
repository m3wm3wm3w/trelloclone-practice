# Шаблон для отчета

## 5.1 Выбранный проект

**Название проекта:** Trello Clone

**Ссылка на проект из каталога:**  
https://bigardone.dev/blog/2016/01/04/trello-tribute-with-phoenix-and-react-pt-1/

**Что реализовано:**  
Создан полнофункциональный клон Trello с возможностью регистрации пользователей, создания досок, списков и карточек. Реализован real-time функционал для синхронизации изменений между всеми подключенными пользователями через WebSocket. Проект адаптирован из оригинального гайда на Phoenix/Elixir под современный стек Node.js + Express + MongoDB + React + Redux + Socket.io.

---

## 5.2 Технический паспорт проекта

| Параметр | Значение |
|----------|----------|
| **GitHub репозиторий** | https://github.com/m3wm3wm3w/trelloclone-practice |
| **Деплой (Frontend)** | [ВАШ_VERCEL_URL] |
| **Деплой (Backend API)** | [ВАШ_RENDER_URL] |
| **Стек (Backend)** | Node.js, Express, MongoDB, Socket.io, JWT |
| **Стек (Frontend)** | React 18, Redux Toolkit, React Router, Sass |
| **База данных** | MongoDB Atlas |
| **Тестовый логин** | test@example.com |
| **Тестовый пароль** | test123 |
| **Code Climate** | [ССЫЛКА_НА_CODE_CLIMATE] |

---

## 5.3 Архитектура

### Общая архитектурная схема

```
┌─────────────────────┐         ┌─────────────────────┐         ┌─────────────────────┐
│   React Frontend    │ ◄────► │   Express Backend   │ ◄────► │   MongoDB Atlas     │
│   (Redux Store)     │  HTTP   │    (REST API)       │         │    (Database)       │
│                     │  WebSocket  Socket.io         │         │                     │
│ - Auth Pages        │         │  - Authentication   │         │ - User Collection   │
│ - Boards List       │         │  - Boards API       │         │ - Board Collection  │
│ - Board View        │         │  - Lists API        │         │ - List Collection   │
│ - Real-time Updates │         │  - Cards API        │         │ - Card Collection   │
└─────────────────────┘         └─────────────────────┘         └─────────────────────┘
```

### ERD (Entity Relationship Diagram)

```
┌─────────────────┐
│      User       │
├─────────────────┤
│ _id (PK)        │
│ email           │
│ password        │
│ firstName       │
│ lastName        │
└─────────────────┘
        │
        │ 1:N (owner)
        ▼
┌─────────────────┐
│     Board       │
├─────────────────┤
│ _id (PK)        │
│ name            │
│ owner (FK)      │───► User._id
│ members[] (FK)  │───► User._id (array)
└─────────────────┘
        │
        │ 1:N
        ▼
┌─────────────────┐
│      List       │
├─────────────────┤
│ _id (PK)        │
│ name            │
│ board (FK)      │───► Board._id
│ position        │
└─────────────────┘
        │
        │ 1:N
        ▼
┌─────────────────┐
│      Card       │
├─────────────────┤
│ _id (PK)        │
│ name            │
│ description     │
│ list (FK)       │───► List._id
│ position        │
└─────────────────┘
```

### Use Case сценарии

**UC-1: Создание и управление доской**
- Актор: Зарегистрированный пользователь
- Предусловие: Пользователь авторизован
- Основной сценарий:
  1. Пользователь нажимает "Create new board"
  2. Вводит название доски
  3. Система создает доску и добавляет пользователя как владельца
  4. Пользователь перенаправляется на страницу доски
  5. Пользователь может добавлять списки и карточки
- Результат: Создана доска со списками и карточками

**UC-2: Real-time синхронизация изменений**
- Актор: Несколько пользователей на одной доске
- Предусловие: Пользователи открыли одну и ту же доску
- Основной сценарий:
  1. Пользователь A создает новую карточку
  2. Сервер получает запрос и обновляет базу данных
  3. Сервер отправляет Socket.io событие всем подключенным к доске
  4. Пользователь B автоматически видит новую карточку без перезагрузки
- Результат: Все пользователи видят актуальное состояние доски

**UC-3: Редактирование карточки**
- Актор: Участник доски
- Предусловие: Доска открыта, есть карточки
- Основной сценарий:
  1. Пользователь кликает на карточку
  2. Открывается модальное окно редактирования
  3. Пользователь изменяет название и/или описание
  4. Нажимает "Save"
  5. Система обновляет карточку в БД
  6. Все подключенные пользователи видят обновление
- Результат: Карточка обновлена для всех пользователей

**UC-4: Удаление элементов с подтверждением**
- Актор: Владелец или участник доски
- Предусловие: Есть доска/список/карточка для удаления
- Основной сценарий:
  1. Пользователь нажимает кнопку удаления (×)
  2. Появляется модальное окно подтверждения
  3. Пользователь подтверждает действие
  4. Система удаляет элемент из БД
  5. Элемент исчезает у всех подключенных пользователей
- Результат: Элемент удален

### API Endpoints

**Authentication:**
- `POST /api/auth/register` - Регистрация нового пользователя
- `POST /api/auth/login` - Вход в систему (возвращает JWT токен)
- `GET /api/auth/me` - Получить данные текущего пользователя

**Boards:**
- `GET /api/boards` - Получить все доски пользователя
- `GET /api/boards/:id` - Получить доску со списками и карточками
- `POST /api/boards` - Создать новую доску
- `POST /api/boards/:id/members` - Добавить участника на доску
- `DELETE /api/boards/:id` - Удалить доску (только владелец)

**Lists:**
- `POST /api/lists` - Создать список на доске
- `PUT /api/lists/:id` - Обновить название списка
- `DELETE /api/lists/:id` - Удалить список

**Cards:**
- `POST /api/cards` - Создать карточку в списке
- `PUT /api/cards/:id` - Обновить карточку
- `PUT /api/cards/:id/move` - Переместить карточку между списками
- `DELETE /api/cards/:id` - Удалить карточку

Полная документация API: https://github.com/m3wm3wm3w/trelloclone-practice/blob/main/API_DOCUMENTATION.md

---

## 5.4 Таблица соответствия (трассировка реализации)

| № | Функция | Файл/папка в GitHub | Страница в деплое |
|---|---------|---------------------|-------------------|
| 1 | Регистрация пользователя | [server/routes/auth.js#L1-L50](https://github.com/m3wm3wm3w/trelloclone-practice/blob/main/server/routes/auth.js) | [ВАШ_URL]/signup |
| 2 | Вход в систему | [server/routes/auth.js#L52-L90](https://github.com/m3wm3wm3w/trelloclone-practice/blob/main/server/routes/auth.js) | [ВАШ_URL]/signin |
| 3 | Создание доски | [server/routes/boards.js#L20-L40](https://github.com/m3wm3wm3w/trelloclone-practice/blob/main/server/routes/boards.js) | [ВАШ_URL]/ (кнопка Create) |
| 4 | Список досок | [server/routes/boards.js#L1-L18](https://github.com/m3wm3wm3w/trelloclone-practice/blob/main/server/routes/boards.js) | [ВАШ_URL]/ |
| 5 | Просмотр доски | [server/routes/boards.js#L42-L70](https://github.com/m3wm3wm3w/trelloclone-practice/blob/main/server/routes/boards.js) | [ВАШ_URL]/boards/:id |
| 6 | Удаление доски | [server/routes/boards.js#L95-L120](https://github.com/m3wm3wm3w/trelloclone-practice/blob/main/server/routes/boards.js) | [ВАШ_URL]/ (кнопка удалить) |
| 7 | Создание списка | [server/routes/lists.js#L1-L35](https://github.com/m3wm3wm3w/trelloclone-practice/blob/main/server/routes/lists.js) | [ВАШ_URL]/boards/:id (Add list) |
| 8 | Удаление списка | [server/routes/lists.js#L55-L85](https://github.com/m3wm3wm3w/trelloclone-practice/blob/main/server/routes/lists.js) | [ВАШ_URL]/boards/:id (× на списке) |
| 9 | Создание карточки | [server/routes/cards.js#L1-L40](https://github.com/m3wm3wm3w/trelloclone-practice/blob/main/server/routes/cards.js) | [ВАШ_URL]/boards/:id (Add card) |
| 10 | Редактирование карточки | [server/routes/cards.js#L42-L75](https://github.com/m3wm3wm3w/trelloclone-practice/blob/main/server/routes/cards.js) | [ВАШ_URL]/boards/:id (клик на карточку) |
| 11 | Удаление карточки | [server/routes/cards.js#L100-L130](https://github.com/m3wm3wm3w/trelloclone-practice/blob/main/server/routes/cards.js) | [ВАШ_URL]/boards/:id (× на карточке) |
| 12 | Перемещение карточки | [server/routes/cards.js#L77-L98](https://github.com/m3wm3wm3w/trelloclone-practice/blob/main/server/routes/cards.js) | [ВАШ_URL]/boards/:id (drag & drop) |
| 13 | Real-time обновления | [server/index.js#L60-L120](https://github.com/m3wm3wm3w/trelloclone-practice/blob/main/server/index.js) | Автоматически на всех досках |
| 14 | Отображение онлайн пользователей | [client/src/components/ConnectedUsers.js](https://github.com/m3wm3wm3w/trelloclone-practice/blob/main/client/src/components/ConnectedUsers.js) | [ВАШ_URL]/boards/:id (правый верхний угол) |
| 15 | Модальное окно подтверждения удаления | [client/src/components/ConfirmModal.js](https://github.com/m3wm3wm3w/trelloclone-practice/blob/main/client/src/components/ConfirmModal.js) | При удалении досок/списков/карточек |
| 16 | Redux состояние (аутентификация) | [client/src/redux/slices/authSlice.js](https://github.com/m3wm3wm3w/trelloclone-practice/blob/main/client/src/redux/slices/authSlice.js) | Управление состоянием авторизации |
| 17 | Redux состояние (доски) | [client/src/redux/slices/boardsSlice.js](https://github.com/m3wm3wm3w/trelloclone-practice/blob/main/client/src/redux/slices/boardsSlice.js) | Управление списком досок |
| 18 | Redux состояние (текущая доска) | [client/src/redux/slices/currentBoardSlice.js](https://github.com/m3wm3wm3w/trelloclone-practice/blob/main/client/src/redux/slices/currentBoardSlice.js) | Управление состоянием открытой доски |
| 19 | Компонент доски | [client/src/pages/Board.js](https://github.com/m3wm3wm3w/trelloclone-practice/blob/main/client/src/pages/Board.js) | [ВАШ_URL]/boards/:id |
| 20 | Компонент списка досок | [client/src/pages/Boards.js](https://github.com/m3wm3wm3w/trelloclone-practice/blob/main/client/src/pages/Boards.js) | [ВАШ_URL]/ |

---

## 5.5 Демонстрация работы

[ЗДЕСЬ ВСТАВИТЬ ССЫЛКУ НА GIF/ВИДЕО]

**Описание демонстрации:**
1. Регистрация нового пользователя
2. Создание доски "My Project"
3. Добавление списков "To Do", "In Progress", "Done"
4. Создание карточек в списках
5. Редактирование карточки с добавлением описания
6. Открытие доски в двух вкладках
7. Демонстрация real-time обновлений (создание карточки в одной вкладке, появление в другой)
8. Перемещение карточки между списками
9. Удаление карточки с модальным подтверждением
10. Отображение подключенных пользователей

**Длительность:** ~1.5 минуты

**Инструменты для записи:**
- **GIF:** [ScreenToGif](https://www.screentogif.com/) (Windows)
- **Видео:** [Loom](https://www.loom.com/) или OBS Studio
- **asciinema:** Только для CLI проектов (не подходит)

---

## 5.6 Качество кода

**Code Climate Maintainability:** [A/B/C/D/F]

**Ссылка на анализ:**  
https://codeclimate.com/github/m3wm3wm3w/trelloclone-practice

**Бейдж в README:**  
[![Maintainability](https://api.codeclimate.com/v1/badges/XXXXX/maintainability)](https://codeclimate.com/github/m3wm3wm3w/trelloclone-practice/maintainability)

**Основные показатели:**
- Maintainability Score: [ЗНАЧЕНИЕ]
- Test Coverage: N/A (тесты не реализованы в учебном проекте)
- Technical Debt Ratio: [ЗНАЧЕНИЕ]

**Применённые практики:**
- Модульная архитектура (разделение frontend/backend)
- RESTful API дизайн
- JWT для безопасной аутентификации
- Хеширование паролей (bcrypt)
- Валидация входных данных
- Обработка ошибок на всех уровнях
- Использование middleware для авторизации
- Redux для управления состоянием
- WebSocket для real-time обновлений
- Semantic commit messages
- Comprehensive documentation

---

## 5.7 Вывод по практике

**Что было сделано:**
В рамках практики был разработан полнофункциональный клон Trello - web-приложение для управления проектами и задачами. Проект основан на гайде "Trello tribute with Phoenix and React", но полностью адаптирован под современный JavaScript стек: Node.js + Express на backend, React + Redux на frontend, MongoDB в качестве базы данных и Socket.io для real-time функционала.

Реализован полный цикл разработки: проектирование архитектуры, создание моделей данных, разработка RESTful API, построение интерактивного пользовательского интерфейса, интеграция real-time обновлений через WebSocket, настройка базы данных в облаке (MongoDB Atlas), деплой на production-серверы (Render для backend, Vercel для frontend), и создание комплексной документации проекта.

**Основные достижения:**
- Спроектирована и реализована клиент-серверная архитектура с четким разделением ответственности
- Создан безопасный механизм аутентификации с использованием JWT токенов и хеширования паролей
- Реализована real-time синхронизация между клиентами через Socket.io, позволяющая нескольким пользователям работать с одной доской одновременно
- Разработан современный адаптивный интерфейс с использованием React и Redux Toolkit
- Настроен production-ready деплой с использованием cloud-сервисов
- Создана подробная документация включая архитектуру, API endpoints, инструкции по развертыванию

**Технические сложности и их решение:**
Основная сложность заключалась в реализации стабильной real-time синхронизации. Изначально возникала проблема дублирования элементов - при создании списка или карточки они появлялись в нескольких экземплярах, а затем исчезали. Проблема была вызвана race condition: элементы добавлялись и локально через Redux, и через Socket.io события. Решение включало добавление проверок на существование элементов перед добавлением в Redux store и правильную последовательность событий - сначала сервер подтверждает подключение к комнате доски, только потом клиент обрабатывает события.

Второй сложностью было правильное управление Socket.io подключениями и избежание утечек памяти. Решением стало добавление cleanup функций в useEffect hooks для удаления старых обработчиков событий перед регистрацией новых.

**Полученные навыки:**
- Проектирование full-stack приложений с real-time функционалом
- Работа с WebSocket протоколом и Socket.io библиотекой
- Построение RESTful API с использованием Express.js
- Управление состоянием в React приложениях с Redux Toolkit
- Работа с MongoDB и mongoose ODM
- Реализация JWT аутентификации и авторизации
- Деплой Node.js и React приложений на cloud платформы
- Настройка CORS и безопасности web-приложений
- Работа с Git и создание осмысленной истории коммитов

**Что можно улучшить:**
При дальнейшей разработке проекта планируется добавить drag-and-drop функционал для перемещения карточек между списками (библиотека react-beautiful-dnd), реализовать UI для добавления участников на доски (сейчас доступно только через API), добавить возможность прикрепления файлов к карточкам, создать систему уведомлений, внедрить unit и integration тесты, настроить CI/CD pipeline для автоматического деплоя, и оптимизировать производительность для работы с большими досками.

Также было бы полезно добавить более детальную аналитику (Code Climate показал области для рефакторинга), внедрить TypeScript для type safety, создать мобильное приложение на React Native, и добавить интеграции с популярными сервисами (Slack, GitHub, Jira).

**Заключение:**
Проект успешно демонстрирует владение современным JavaScript стеком и понимание принципов full-stack разработки. Особенно ценным опытом стала работа с real-time технологиями и решение связанных с ними архитектурных задач. Полученные знания и навыки применимы в реальных commercial проектах и являются востребованными на рынке труда.

---

## Приложения

### Тестовые данные для проверки

**Пользователь 1 (владелец):**
- Email: test@example.com
- Password: test123

**Пользователь 2 (участник):**
- Email: john@example.com  
- Password: john123

### Ссылки

- GitHub: https://github.com/m3wm3wm3w/trelloclone-practice
- Деплой: [ВАШ_VERCEL_URL]
- Backend API: [ВАШ_RENDER_URL]
- Code Climate: [ССЫЛКА]
- Оригинальный гайд: https://bigardone.dev/blog/2016/01/04/trello-tribute-with-phoenix-and-react-pt-1/
