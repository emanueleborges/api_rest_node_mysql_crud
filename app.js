require('dotenv').config()
//import bibliotecas
const express       = require('express');
const app           = express();
//const morgan        = require('morgan');
const bodyParser    = require('body-parser');
const fs            = require('fs');
const path          = require('path');
const cors          = require('cors') 
const res           = require('express/lib/response');
const swaggerUi     = require('swagger-ui-express');

//var accessLogStream = fs.createWriteStream(path.join(__dirname, 'log_acessos.log'), { flags: 'a' })

//rota publica 
const  public = path.join(__dirname, 'uploads');

// importar rotas
const rotaProdutos  = require('./routes/produtos');
const rotaPedidos   = require('./routes/pedidos');
const rotaUsuarios  = require('./routes/usuarios');
const { redirect }  = require('express/lib/response');

// usar rotas
app.use(cors()) 
app.use('/uploads', express.static(public)); //rota publica
//app.use(morgan('dev')); // monitor de rotas 
app.use(bodyParser.urlencoded({extended: true })); //dados simples
app.use(bodyParser.json()); // somente dados json
//app.use(morgan('combined', { stream: accessLogStream })) 
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,PATCH, DELETE');
    next();
});
//rotas app
app.use('/produtos',rotaProdutos);
app.use('/pedidos' ,rotaPedidos);
app.use('/usuarios',rotaUsuarios);
app.use(bodyParser.json());
app.use((error, req, res, next) => {
    res.status(error.status || 302);
    return res.send({
        mensagem: ' Api Ok. Rota Não Encontrada',                 
        })
    } 
)
// swagger documentacao api rest 
const swaggerFile = require('./swagger/swagger_auto_2.json');
app.use('/',  swaggerUi.serve,  swaggerUi.setup(swaggerFile));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin: *", "Access-Control-Allow-Headers","Access-Control-Allow-Headers", "Content-Type: application/json;");
    //if (req.method === 'OPTIONS'){
        res.header('Acess-Control-Allow-Methods', 'PUT, POST, GET, PATCH, DELETE');
        return res.status(200).send({});
    //}
})
module.exports = app;
