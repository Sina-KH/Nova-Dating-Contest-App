# 🍾 [NovaDating TelegramWebApp](http://t.me/NovaDatingBot/app)

This repository is the back-end source code of the telegram [@NovaDatingBot](https://t.me/TeleDatingBot).

This bot is written as a mini-app for [Telegram Mini-App Contest](https://t.me/contest/327).
It is developed and submitted as a dating mini-app for this contest and lets its users find their ideal friends/partner~~s~~ with mutual interests.

You can also find the [**FRONT-END SOURCE CODE** here](https://github.com/Sina-KH/Nova-Dating-TWA).

Feel free to use this source code as your new project's template. I tried to develop it as easy to understand and clear, as I could. It is NOT over-engineered at all!

## 📚 Documentation

This file is the start point of the documentation, detailed .md files are located in the documentations directory and **you can also find links to those files, below in this file**.

## 🤓 Features / User Flow

- [x] 🤘 No classic registrations required, users will be registered using their Telegram account.
- [x] 🥸 Choose your `Gender`, `Age`, `Interests` and upload your `profile photos` to let other users know you.
- [x] 🔥 Find friends based on your interests and filters. Like them and get their telegram account once you've matched!
- [x] 📱 Telegram color-palette support. The app will use the active theme of the telegram.
- [x] 📝  Multi-language support.
- [x] ⚡️ Socket.IO adapter in codebase to easily add real-time features. **`New Match` event is now implemented.**
- [x] 🐇 Clustered back-end forks.
- [x] 🤖 Auto postman collection generator/uploader.
- [ ] 📍 For now, It shows all registered users, but I will add location filters in future revisions.

## Tech Stack

- Typescript programming language, using NodeJS framework.
- MongoDB as primary database.
- Redis as cache database and socket.io adapter.

## Build Requirements

- NodeJS
- `npm` package manager
- MongoDB
- Redis

## Build and run using node.js

- Clone the project. (**you can clone the latest commit before dead-line using this repository**, or clone the latest back-end code from `git clone https://github.com/Sina-KH/Nova-Dating-Service.git`)
- Run `npm install` to install required dependencies. (You can also consider using pnpm, yarn, bun or any similar package managers)
- Copy the `.env.example` to `.env` file and enter your mongodb/redis instance data into it.
- Run `npm run start-base-data-dev` to create basic documents in the database. (for example, interest tags)
- Now just start the app using `npm run build` and `npm run start-app` command. (or `npm run start-app-dev` for development purposes.)

## Build and run using Docker

If you prefer to use docker instead of `node` and `pm2`, You can easily deploy the code using `docker-compose`:

- Create `.env` file.
- Update files path in `docker-compose.yml` file
- Just run `docker-compose up -d`

## .env file creation guidance

To know more about project's `.env` file variables, please [read here](documentations/env_variables.md).

## More about project scripts

- **build:** build the project code
- **start-app:** can run the code after build
- **start-app-dev:** to watch the source and develop
- **start-base-data:** to create interests (basic db documents)
- **start-base-data-dev:** to create base data without building the project
- 🔥 **docs:** auto generate postman collection with sample input/output
- **test:** run tests
- **coverage:** test coverage status

## Code architecture

> src/

This directory contains all the source code.

> src/baseData

Base documents to be inserted into database, like interest tags.

> src/docs

Postman collection generator! It can black-box test all the endpoints one by one using given inputs and create sample responses for postman.

Finally, If the postman api data is provided in the `.env_test` file, It will update the collection automatically.

> src/endpoints

The endpoints, called using `HTTP` or `SocketIO` routers.

Each endpoint defines its `access level`, `input interface`, `expected output` and `sample data` for the documentation generator.

To know more about endpoints and adding new ones into the project, [read this document file](documentations/add_endpoints.md).

> src/helpers

`Exceptions`, `Localization` data and prototype extensions are here.

> src/logic

Each endpoint calls related logic tree to do the task. Finally, the result will be returned to endpoint and routers.

> src/models

Each model represents a collection in the primary database (MongoDB). Including its `interface`, `schema`, `indexes` and `properties to project` in different situations.

To know more about models and adding new ones into the project, [read this document file](documentations/add_models.md).

> src/repos

Repository is the layer responsible for running queries.

> src/services

Services are responsible to **connect the application to outer services**. For example MongoService is responsible to connect the app to mongodb.