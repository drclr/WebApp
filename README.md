# Web App

Vuejs 3 Web App to share articles and comments, created to send requests to [REST API](https://github.com/drclr/REST-API).

The Web App enables to sign up, to sign in to vizualize all articles previously posted by others users. Users can post articles and comments. They can modify and delete what they previously posted.

The Web App is built with Vite using Pinia and Vue Router.


## Technologies

- Vue 3 with Composition API
- Typescript
- Vuetify 3 Beta
- CSS Sass

## Installation and usage
To run this project, add a .env file with [REST API](https://github.com/drclr/REST-API)  URL root required to send requests. The URL includes PORT and DB_host parameters values fixed in the [REST API](https://github.com/drclr/REST-API) .env file. 

For example let [REST API](https://github.com/drclr/REST-API) .env parameters be
 PORT = '3000' and DB_host = 'localhost', then VITE_URL_API = "http://localhost:3000/".

```bash
VITE_URL_API = ...
```
install and launch it locally:
```bash
npm install
npm run dev
```
## Files tree

```bash
Web App/
├─ src/
│  ├─ assets/base.scss -> CSS parameters required across the app
│  ├─ components/ -> components used in views
│  ├─ plugins/
│  ├─ router/ -> vue router
│  ├─ stores/ -> pinia stores
│  ├─ types/ -> custom types used accross the app
│  ├─ use/ -> functions used accross the app
│  ├─ views/ -> main components
│  ├─ App.vue -> root component required to create the app instance
│  ├─ main.ts -> app instance
├─ index.html -> web page where the app instance is mounted
```







