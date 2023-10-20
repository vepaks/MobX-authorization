
# MobX-authorization

Изчистен сървър за учебни проекти с email потвърждение на регистрацията.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
<img src="https://mobx.js.org/assets/mobx.png" alt="logo" height="29"/>
![ExpressJS](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)
![ExpressJS](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)


## Сървър

#### Настройка на сървъра

* Влез в директорията server:
```bash
   cd MobX-authorization/server
```
* Инсталирай зависимостите:
```bash
   npm install
```

* Конфигуриране на MongoDB в сървъра:
  Провери файлът server/.env за настройки относно връзката с MongoDB. Попълни коректни данни за изпращане на email.

* Стартиране на сървъра:

Използвай командата:
```bash
   npm run dev
```

Това трябва да стартира сървъра на localhost:3000.

## API

#### Регистрация

```http
  POST /api/registration
```

| Параметър | Тип     |
| :-------- | :------- |
| `email` | `string` |
| `password` | `string` | 

#### Примерна GET заявка

```http
  GET /api/users
```

## Клент

#### Настройка на клиент(React)

* Влез в директорията client
```bash
   cd MobX-authorization/client
```
* Инсталирай зависимостите:
```bash
   npm install
```
* Настройките на axios се намират в:
```bash
   cd MobX-authorization/client/http
```
* Настройките на mobX се намират в:
```bash
   cd MobX-authorization/client/store
```

* Стартиране на клиентски сървър:

Използвай командата:
```bash
   npm start
```

Това трябва да стартира сървъра на localhost:5000.


## FAQ

#### Как да настроя email

Посетете https://myaccount.google.com/security - в секцията "Потвърждаване в две стъпки" има настройки "Пароли за приложения" там добавяте ново приложение и паролата я използвате в .env

