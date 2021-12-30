//import bibliotecas
const express       = require('express');
const app           = express();
const morgan        = require('morgan');
const bodyParser    = require('body-parser');
const fs            = require('fs');
const path          = require('path');
//const cors          = require('cors');
// importar rotas
const rotaProdutos  = require('./routes/produtos');
const rotaPedidos   = require('./routes/pedidos');

// usar rotas
app.use(morgan('dev')); // monitor de rotas 
app.use(bodyParser.urlencoded({extended: false })); //dados simples
app.use(bodyParser.json()); // somente dados json

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream })) 


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,PATCH, DELETE');
    next();
});

app.use('/produtos',rotaProdutos);
app.use('/pedidos',rotaPedidos);

app.use((req, res, next) => {
    const erro = new Error('Rota não encontrada');
    erro.status(404);
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
       
        return res.send ({
            error: { 
                mensagem:' Rota Não Encontrada ' //ou  error.message
            } 
        })
    } 
)

  
module.exports = app;
