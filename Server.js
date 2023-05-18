require('dotenv').config();
const express = require('express');
const session = require('express-session');
const mysql = require('mysql2');
const PORT = process.env.PORT || 3001;
const routes = require('./controllers')
const db = require('./config/connection');
const { engine } = require('express-handlebars');
const { createConnection } = require('mysql2');


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Setup handlebars
app.engine('hbs', engine({
  extname: '.hbs',
  runtimeOptions: {
    allowProtoPropertiesByDefault: true
  }
}));

app.set('view engine', 'hbs');
app.set('views', './views');

app.use(routes)

db.sync().then(() => {
  app.listen(PORT, () => console.log(`:) Server started on ${PORT} %s`))
});
