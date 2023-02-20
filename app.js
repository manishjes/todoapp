const express = require('express');
const todocontroller = require('./controllers/todocontroller')
const app = express();

app.set('view engine', 'ejs');

app.use(express.static('./public'))

todocontroller(app);

//localhost:300/assets/Style.css

app.listen(3000);
console.log('you are listening to port 3000');

