# Публикация проекта на GitHub

## Шаг 1: Создайте репозиторий на GitHub

1. Зайдите на [github.com](https://github.com) и войдите в свой аккаунт
2. Нажмите кнопку "+" в правом верхнем углу → "New repository"
3. Заполните форму:
   - **Repository name:** `trello-clone`
   - **Description:** Trello clone built with Node.js, Express, MongoDB, React, Redux and Socket.io
   - **Visibility:** Public (для учебного проекта)
   - ❌ НЕ инициализируйте с README, .gitignore или лицензией (они уже есть локально)
4. Нажмите "Create repository"

## Шаг 2: Подключите локальный репозиторий

После создания репозитория GitHub покажет инструкции. Выполните в терминале:

```bash
# Добавьте удаленный репозиторий
git remote add origin https://github.com/ваш-username/trello-clone.git

# Или если используете SSH:
git remote add origin git@github.com:ваш-username/trello-clone.git

# Отправьте код на GitHub
git branch -M main
git push -u origin main
```

## Шаг 3: Проверьте загрузку

1. Обновите страницу репозитория на GitHub
2. Убедитесь что все файлы загружены
3. README.md должен отображаться на главной странице

## Шаг 4: Настройте Code Climate (для оценки 4-5)

1. Зайдите на [codeclimate.com](https://codeclimate.com)
2. Войдите через GitHub аккаунт
3. Нажмите "Add a repository"
4. Выберите ваш `trello-clone` репозиторий
5. После анализа скопируйте Maintainability Badge
6. Обновите README.md, заменив placeholder badge на реальный

Пример:
```markdown
[![Maintainability](https://api.codeclimate.com/v1/badges/ВАША_ССЫЛКА/maintainability)](https://codeclimate.com/github/username/trello-clone/maintainability)
```

## Шаг 5: Деплой

### Backend на Render

1. Зайдите на [render.com](https://render.com)
2. Подключите GitHub репозиторий
3. Создайте Web Service:
   - **Name:** trello-clone-api
   - **Root Directory:** оставьте пустым
   - **Build Command:** `npm install`
   - **Start Command:** `node server/index.js`
4. Добавьте Environment Variables (см. DEPLOYMENT.md)
5. Нажмите "Create Web Service"
6. Скопируйте URL вашего API

### Frontend на Vercel

1. Зайдите на [vercel.com](https://vercel.com)
2. Подключите GitHub репозиторий
3. Настройте проект:
   - **Root Directory:** `client`
   - **Framework Preset:** Create React App
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`
4. Добавьте Environment Variables:
   - `REACT_APP_API_URL` = ваш Render URL
   - `REACT_APP_SOCKET_URL` = ваш Render URL
5. Нажмите "Deploy"
6. После деплоя получите URL

### Обновите README

Замените в README.md:
```markdown
🔗 [Ссылка на работающее приложение](#) _(будет добавлена после деплоя)_
```

На:
```markdown
🔗 [Демо приложения](https://ваш-проект.vercel.app)
```

И закоммитьте:
```bash
git add README.md
git commit -m "docs: add deployment links"
git push
```

## Текущий статус

✅ Локальный Git репозиторий создан  
✅ Все файлы добавлены в коммиты  
✅ 4 осмысленных коммита сделано  
⏳ Ожидается подключение к GitHub  
⏳ Ожидается деплой  
⏳ Ожидается настройка Code Climate

## Проверка перед сдачей

- [ ] Репозиторий публичный на GitHub
- [ ] README.md корректно отображается
- [ ] Есть хотя бы 3-4 осмысленных коммита
- [ ] Ссылка на гайд указана в README
- [ ] Code Climate Badge добавлен (для 4-5)
- [ ] Деплой работает (для 5)
- [ ] Тестовые данные указаны (для 5)
- [ ] Отчет заполнен по шаблону

## Местоположение репозитория

Локальный репозиторий находится в:
```
C:\Users\Abyss\OneDrive\Рабочий стол\trello clone
```

Git история:
```
7ba4e43 docs: add features list and contributing guide
93ae602 docs: add comprehensive documentation and configuration
cd7ac32 feat: implement React frontend with Redux and Socket.io
35365c0 feat: initial backend setup with Express, MongoDB, and Socket.io
```
