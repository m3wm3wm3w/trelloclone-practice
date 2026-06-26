# API Документация

Base URL: `http://localhost:5000/api`

## Authentication

### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response (201):**
```json
{
  "user": {
    "_id": "...",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  },
  "token": "jwt_token_here"
}
```

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "user": { ... },
  "token": "jwt_token_here"
}
```

### Get Current User
```http
GET /auth/me
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "_id": "...",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe"
}
```

## Boards

### Get All Boards
```http
GET /boards
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "ownedBoards": [ ... ],
  "memberBoards": [ ... ]
}
```

### Get Board by ID
```http
GET /boards/:id
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "board": { ... },
  "lists": [ ... ],
  "cards": [ ... ]
}
```

### Create Board
```http
POST /boards
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "My Board"
}
```

**Response (201):**
```json
{
  "_id": "...",
  "name": "My Board",
  "owner": { ... },
  "members": []
}
```

### Add Member to Board
```http
POST /boards/:id/members
Authorization: Bearer {token}
Content-Type: application/json

{
  "email": "member@example.com"
}
```

**Response (200):**
```json
{
  "_id": "...",
  "name": "My Board",
  "owner": { ... },
  "members": [ ... ]
}
```

### Delete Board
```http
DELETE /boards/:id
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "message": "Board deleted"
}
```

## Lists

### Create List
```http
POST /lists
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "To Do",
  "boardId": "board_id_here"
}
```

**Response (201):**
```json
{
  "_id": "...",
  "name": "To Do",
  "board": "...",
  "position": 0
}
```

### Update List
```http
PUT /lists/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Updated Name"
}
```

### Delete List
```http
DELETE /lists/:id
Authorization: Bearer {token}
```

## Cards

### Create Card
```http
POST /cards
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Task 1",
  "listId": "list_id_here"
}
```

**Response (201):**
```json
{
  "_id": "...",
  "name": "Task 1",
  "description": "",
  "list": "...",
  "position": 0
}
```

### Update Card
```http
PUT /cards/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Updated Task",
  "description": "Task description"
}
```

### Move Card
```http
PUT /cards/:id/move
Authorization: Bearer {token}
Content-Type: application/json

{
  "listId": "new_list_id",
  "position": 2
}
```

### Delete Card
```http
DELETE /cards/:id
Authorization: Bearer {token}
```

## Error Responses

### 400 Bad Request
```json
{
  "error": "Error message here"
}
```

### 401 Unauthorized
```json
{
  "error": "Invalid authentication token"
}
```

### 403 Forbidden
```json
{
  "error": "Access denied"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Server error"
}
```
