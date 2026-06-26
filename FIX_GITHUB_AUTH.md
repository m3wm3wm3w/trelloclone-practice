# Исправление проблемы с Push на GitHub

## Проблема
```
Permission denied to GrandmaChicage
```

Это значит, что Git пытается использовать неправильный аккаунт GitHub.

## 🔧 Решение 1: Использовать Personal Access Token (Рекомендуется)

### Шаг 1: Создайте Personal Access Token

1. Зайдите на GitHub → Settings → Developer settings
2. Personal access tokens → Tokens (classic) → Generate new token
3. Выберите срок действия (например, 90 дней)
4. Отметьте галочки:
   - ✅ repo (все подпункты)
   - ✅ workflow
5. Нажмите "Generate token"
6. **ВАЖНО:** Скопируйте токен сейчас! Он больше не будет показан

### Шаг 2: Обновите remote URL с токеном

В терминале выполните (замените YOUR_TOKEN на ваш токен):

```bash
git remote set-url origin https://YOUR_TOKEN@github.com/m3wm3wm3w/trelloclone-practice.git
```

Пример:
```bash
git remote set-url origin https://ghp_abcd1234xyz@github.com/m3wm3wm3w/trelloclone-practice.git
```

### Шаг 3: Push

```bash
git push -u origin main
```

---

## 🔧 Решение 2: Использовать SSH (Более безопасно)

### Шаг 1: Проверьте SSH ключ

```bash
ls ~/.ssh
```

Если есть `id_rsa.pub` или `id_ed25519.pub` - переходите к Шагу 3.

### Шаг 2: Создайте SSH ключ (если нет)

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

Нажимайте Enter для всех вопросов (используйте defaults).

### Шаг 3: Скопируйте публичный ключ

```bash
cat ~/.ssh/id_ed25519.pub
```

Или для Windows:
```powershell
type $env:USERPROFILE\.ssh\id_ed25519.pub
```

### Шаг 4: Добавьте ключ на GitHub

1. GitHub → Settings → SSH and GPG keys
2. New SSH key
3. Вставьте скопированный ключ
4. Save

### Шаг 5: Измените remote на SSH

```bash
git remote set-url origin git@github.com:m3wm3wm3w/trelloclone-practice.git
```

### Шаг 6: Push

```bash
git push -u origin main
```

---

## 🔧 Решение 3: Использовать GitHub Desktop (Самое простое)

1. Скачайте GitHub Desktop: https://desktop.github.com/
2. Войдите в свой GitHub аккаунт
3. File → Add Local Repository
4. Выберите папку: `C:\Users\Abyss\OneDrive\Рабочий стол\trello clone`
5. Нажмите "Publish repository" или "Push origin"

---

## 🔧 Решение 4: Очистить сохраненные credentials

Если Git использует старые данные:

### Windows:

1. Откройте "Credential Manager" (Диспетчер учетных данных)
2. Windows Credentials → Generic Credentials
3. Найдите `git:https://github.com`
4. Удалите
5. При следующем push Git попросит войти

Или через командную строку:
```bash
git config --global --unset credential.helper
git config --system --unset credential.helper
```

Затем:
```bash
git push -u origin main
```

Git попросит ввести логин и пароль. В качестве пароля используйте Personal Access Token!

---

## ✅ Проверка

После успешного push:

```bash
git remote -v
git branch -a
```

Вы должны увидеть:
```
* main
  remotes/origin/main
```

И на GitHub должны появиться все ваши файлы!

---

## 🆘 Если ничего не помогло

### Вариант А: Создайте новый репозиторий под правильным аккаунтом

1. Войдите в аккаунт `m3wm3wm3w` на GitHub
2. Создайте новый репозиторий
3. Или проверьте, что у вас есть права на существующий репозиторий

### Вариант Б: Переключитесь на правильный GitHub аккаунт

```bash
# Узнайте, под каким аккаунтом вы работаете
gh auth status

# Выйдите
gh auth logout

# Войдите в правильный аккаунт
gh auth login
```

---

## 📝 Текущее состояние

- ✅ Репозиторий: `https://github.com/m3wm3wm3w/trelloclone-practice.git`
- ✅ Ветка: `main`
- ✅ Коммитов: 10
- ❌ Push не работает из-за аутентификации

**Рекомендую:** Решение 1 (Personal Access Token) - самое быстрое!
