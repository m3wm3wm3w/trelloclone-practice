# Настройка Code Climate

## Зачем нужно Code Climate?

Code Climate анализирует качество вашего кода и выставляет оценку от A до F. Для получения оценки 4 или 5 за проект необходим бейдж с оценкой A или B в README.

## Пошаговая инструкция

### Шаг 1: Регистрация

1. Зайдите на [codeclimate.com](https://codeclimate.com/quality)
2. Нажмите "Sign up with GitHub"
3. Авторизуйтесь через GitHub

### Шаг 2: Добавление репозитория

1. После входа нажмите "Add a repository" или "+"
2. Найдите в списке `m3wm3wm3w/trelloclone-practice`
3. Нажмите "Add Repo"

⚠️ Если репозитория нет в списке:
- Нажмите "Sync now" для обновления списка
- Проверьте что репозиторий публичный

### Шаг 3: Настройка анализа

1. Code Climate автоматически начнет анализ
2. Анализ займет 2-5 минут
3. После завершения вы увидите Maintainability Score (A, B, C, D, или F)

### Шаг 4: Получение бейджа

1. В репозитории на Code Climate нажмите "Repo Settings" (⚙️)
2. В боковом меню найдите "Badges"
3. Скопируйте Markdown код для Maintainability Badge

Код будет выглядеть так:
```markdown
[![Maintainability](https://api.codeclimate.com/v1/badges/XXXXXX/maintainability)](https://codeclimate.com/github/m3wm3wm3w/trelloclone-practice/maintainability)
```

### Шаг 5: Добавление бейджа в README

1. Откройте `README.md`
2. Найдите секцию "Code Quality"
3. Замените placeholder на реальный бейдж
4. Закоммитьте и запушьте изменения

## Улучшение оценки

Если оценка ниже B, Code Climate покажет проблемные места:

### Частые проблемы и решения:

**Дублирование кода (Code Duplication)**
- Вынесите повторяющийся код в отдельные функции
- Создайте utility функции для общей логики

**Сложность функций (Complexity)**
- Разбейте большие функции на меньшие
- Используйте early returns для упрощения условий

**Длинные файлы (File Length)**
- Разделите большие компоненты на несколько
- Вынесите логику в отдельные модули

**Неиспользуемый код**
- Удалите закомментированный код
- Удалите неиспользуемые импорты

## Конфигурация (опционально)

Создайте `.codeclimate.yml` в корне проекта для настройки анализа:

```yaml
version: "2"
exclude_patterns:
  - "client/build/"
  - "node_modules/"
  - "client/node_modules/"
  - "**/*.test.js"
  - "**/*.spec.js"

plugins:
  eslint:
    enabled: true
    channel: "eslint-8"
  duplication:
    enabled: true
    config:
      languages:
        javascript:
          mass_threshold: 50
```

## Проверка бейджа

После добавления бейджа в README:

1. Откройте ваш GitHub репозиторий
2. Проверьте что бейдж отображается
3. Кликните на бейдж - должен открыть Code Climate

## Для отчета

В разделе "5.6 Качество кода" укажите:
- Оценку Maintainability (A/B/C/D/F)
- Ссылку на Code Climate: `https://codeclimate.com/github/m3wm3wm3w/trelloclone-practice`
- Скриншот с оценкой (опционально)

## Troubleshooting

### Репозиторий не появляется
- Проверьте что репозиторий публичный
- Нажмите "Sync repositories" в настройках GitHub интеграции
- Попробуйте выйти и войти заново

### Анализ не запускается
- Подождите 5-10 минут
- Проверьте что в репозитории есть JavaScript/React код
- Нажмите "Request build" в настройках репозитория

### Низкая оценка (C/D/F)
- Не критично для учебного проекта
- Можно упомянуть в отчете как "область для улучшения"
- Для оценки 4-5 достаточно наличия бейджа, даже с C

---

## Готово!

После настройки Code Climate:
- ✅ Бейдж в README
- ✅ Ссылка работает
- ✅ Оценка видна
- ✅ Готово для отчета
