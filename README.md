# Эксплуатационный пакет — Информационная система «Prizma»

## Состав пакета

- `server/` — серверная часть (Express.js API)
- `client/` — клиентская часть (React)
- `init-postgres.sql` — скрипт инициализации базы данных
- `start.bat` — скрипт для запуска на Windows
- `README.md` — данный файл

## Системные требования

- **Node.js** (версия 18 или выше)
- **PostgreSQL** (версия 15 или выше)
- **npm** (входит в состав Node.js)

## Быстрый запуск

### 1. Настройка базы данных

```bash
# Создайте базу данных в PostgreSQL:
psql -U postgres

# В консоли PostgreSQL выполните:
CREATE DATABASE prizma;
\q

# Инициализация таблиц:
psql -U postgres -d prizma -f init-postgres.sql
```

### 2. Настройка сервера

```bash
cd server

# Установка зависимостей
npm install

# Создайте файл .env со следующим содержимым:
# DB_HOST=localhost
# DB_PORT=5432
# DB_NAME=prizma
# DB_USER=postgres
# DB_PASSWORD=ваш_пароль
# JWT_SECRET=your-secret-key
# PORT=5000

# Запуск сервера
npm start
```

### 3. Настройка клиента

```bash
cd client

# Установка зависимостей
npm install

# Запуск
npm start
```

### 4. Запуск через start.bat (Windows)

Просто запустите `start.bat`. Он автоматически запустит сервер и клиент.

## Проверка работоспособности

- Веб-приложение: http://localhost:3000
- API сервер: http://localhost:5000
- API документация: http://localhost:5000/api

## Роли пользователей

| Роль | Описание |
|------|----------|
| Администратор | Полный доступ к управлению системой |
| Товаровед | Управление товарами, категориями, животными, заказами |
| Клиент | Просмотр каталога, оформление заказов, личный кабинет |

## Тестовые учетные записи

- **Администратор**: admin@prizma.ru / admin123
- **Товаровед**: merchandiser@prizma.ru / merch123
- **Клиент**: client@prizma.ru / client123
