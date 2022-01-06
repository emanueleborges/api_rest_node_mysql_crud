require('dotenv').config()
//import bibliotecas
const express       = require('express');
const app           = express();
const morgan        = require('morgan');
const bodyParser    = require('body-parser');
const fs            = require('fs');
const path          = require('path');


//rota publica 
const  public = path.join(__dirname, 'uploads');
app.use('/uploads', express.static(public));

// importar rotas
const rotaProdutos  = require('./routes/produtos');
const rotaPedidos   = require('./routes/pedidos');
const rotaUsuarios  = require('./routes/usuarios');
const res = require('express/lib/response');

// usar rotas
app.use(morgan('dev')); // monitor de rotas 
app.use(bodyParser.urlencoded({extended: false })); //dados simples
app.use(bodyParser.json()); // somente dados json

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'log_acessos.log'), { flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream })) 

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,PATCH, DELETE');
    next();
});

app.use('/produtos',rotaProdutos);
app.use('/pedidos',rotaPedidos);
app.use('/usuarios',rotaUsuarios);

app.use(bodyParser.json());

app.use((req, res, next) => {
    const erro = new Error('Rota não encontrada, informada ou inexistente');
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

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin: *", "Access-Control-Allow-Headers","Access-Control-Allow-Headers", "Content-Type: application/json; charset=utf-8");
        
    if (req.method === 'OPTIONS'){
        res.header('Acess-Control-Allow-Methods', 'PUT, POST, GET, PATCH, DELETE');
        return res.status(200).send({});
    }

})

  
module.exports = app;
