const express = require('express'); // biblioteca para trabalhar com rotas 
const consign = require('consign'); // biblioteca para facilitar o gerenciamento das rotas
const bodyParser = require('body-parser'); // biblioteca para interpretar o POST 
const expressValidator = require('express-validator');
// let routesIndex = require('./routes/index'); sem consing
// let routesUsers = require('./routes/users'); sem consing

let app = express();

app.use(bodyParser.urlencoded({ extended: false, limit: '50mb'}));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(expressValidator());

consign().include('routes').include('utils').into(app);
// app.use(routesIndex); sem consing
// app.use('/users', routesUsers); sem consing

app.listen(4000, '192.168.1.24', () => {
    console.log('servidor rodando!');
});