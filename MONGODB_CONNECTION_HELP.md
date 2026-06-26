# 🔧 Как получить правильный Connection String

## Шаг 1: Откройте MongoDB Atlas

Зайдите на: https://cloud.mongodb.com/

## Шаг 2: Найдите ваш кластер

На главной странице Database вы увидите ваш кластер (например, Cluster0)

## Шаг 3: Нажмите Connect

Найдите кнопку **"Connect"** рядом с названием кластера и нажмите её

## Шаг 4: Выберите метод подключения

Выберите **"Drivers"** или **"Connect your application"**

## Шаг 5: Выберите драйвер

- Driver: **Node.js**
- Version: **4.1 or later** (или любая версия)

## Шаг 6: Скопируйте Connection String

Вы увидите строку подключения, например:

```
mongodb+srv://KuznetsovaE:<password>@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority
```

**ВАЖНАЯ ЧАСТЬ:** `cluster0.abcde.mongodb.net`
- `abcde` - это уникальный идентификатор вашего кластера
- У вас он может быть другой (например, `xyz12`, `mnb45` и т.д.)

## Шаг 7: Что делать дальше

Пришлите мне ваш connection string одним из способов:

### Вариант А: Полностью (с <password>)
```
mongodb+srv://KuznetsovaE:<password>@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority
```

### Вариант Б: Только адрес кластера
```
cluster0.abcde.mongodb.net
```

Я подставлю ваш пароль `730KmzblZcSzbENn` автоматически.

---

## 🔍 Альтернативный способ: Найти в коде на странице

На странице Connect → Drivers внизу есть код примера:

```javascript
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://...";  // <-- ВОТ ЭТО НАМ НУЖНО
```

Скопируйте значение `uri` и пришлите мне.

---

## ❓ Проблемы?

### Не можете найти кластер?
- Убедитесь, что вы вошли в правильный аккаунт MongoDB Atlas
- Проверьте, завершилось ли создание кластера (зеленая галочка)

### Нет кнопки Connect?
- Кластер еще создается (подождите 3-5 минут)
- Обновите страницу

### Кластер не создан?
- Создайте новый: Database → Build a Database → FREE (M0)
