# 🍾 [NovaDating TelegramWebApp](http://t.me/NovaDatingBot/app)

This repository is the front-end source code of the telegram web app [@NovaDatingBot](https://t.me/TeleDatingBot).

You can also find the [**BACK-END SOURCE CODE** here](https://github.com/Sina-KH/Nova-Dating-Service).

This bot is written as a mini-app for [Telegram Mini-App Contest](https://t.me/contest/327).
It is developed and submitted as a dating mini-app for this contest and lets its users find their ideal friends/partner~~s~~ with mutual interests.

Feel free to use this source code as your new project's template. I tried to develop it as easy to understand and clear, as I could. It is NOT over-engineered at all!

<img src="documentations/images/NovaDatingApp-Profile.jpg" width="200" alt="NovaDatingApp-ProfilePic">

## 🤓 Features / User Flow

- [x] 🤘 No classic registrations required, users will be registered using their Telegram account.
- [x] 🥸 Choose your `Gender`, `Age`, `Interests` and upload your `profile photos` to let other users know you.
- [x] 🔥 Find friends based on your interests and filters. Like them and get their telegram account once you've matched!
- [x] 📱 Telegram color-palette support. The app will use the active theme of the telegram.
- [x] 📝  Multi-language support.
- [x] ⚡️ Socket.IO connection to easily add real-time features. **`New Match` event is now implemented.**
- [ ] ☝️ **Disable collapse gesture** in `explore` and `crop` screens.
- [ ] 📍 For now, It shows all registered users, but I will add location filters in future revisions.

## Tech Stack

- Typescript programming language, using NextJS framework.
- TailwindCSS, utility-first CSS framework to develop UI!

## Libraries

- **React:** Well-known front-end library for building user interfaces based on components.
- **NextJS:** Another well-known front-end framework based on React. In this project we use next.js to manage routes, use its other great out-of-the-box features.
- **tailwindcss:** I love how tailwind makes UI development easy! 🤘
- **Axios:** To send API requests to the back-end service.
- **clsx:** A tiny utility for constructing className strings conditionally.
- **framer-motion:** No animate page transitions.
- **react-datepicker:** Datepicker library, used for birthdate input.
- **react-image-crop:** To let users crop their profile photo.
- **react-slider:** Range slider, used in search filters.
- **react-swipeable:** Swipeable cards, used in explore screen. 

## Build Requirements

- NodeJS
- `npm` package manager

## How to build and run the project

- Clone the project. (**you can clone the latest commit before dead-line using this repository**, or clone the latest twa code from `git clone https://github.com/Sina-KH/Nova-Dating-TWA.git`)
- Run `npm install` to install required dependencies. (You can also consider using pnpm, yarn, bun or any similar package managers)
- Copy the `.env.example` to `.env` file and update your backend server data in this file.
- Run `npm run dev` to test and develop.
- To run the project in production mode, run `npm run build` and `npm run start` commands.

## How to build and run using `docker`

If you prefer to use docker instead of `node` and `pm2`, You can easily deploy the code using `docker-compose`:

- Create `.env` file.
- Just run `docker-compose up -d`

## Code architecture

> src/

This directory contains all the source code.

> src/api

Back-end services are defined and called here.

> src/components

All the base components used in the screens and pages are located here.

> src/contexts

React context codes like `useSession` are located here.

For example `useSession` (`MySessionProvider`) is responsible for validating the `telegram init data` and receiving the `token` from server, on start.

> src/helpers

`Localization` resources and prototype extensions are here.

> src/pages

All the routes are defined here and linked into different screens.

> src/screens

Each page in the web-application has a `screen` file here.

> src/styles

Global styles are located here.

> src/types

All the interface models used in the app, are defined here.