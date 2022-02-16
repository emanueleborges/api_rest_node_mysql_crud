const mysql = require('mysql')

var conn = mysql.createPool({
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    password: process.env.MYSQL_PASSWORD
});

conn.getConnection((err,connection)=> {
  if(err){
    console.log('Sem Conexão com o Banco de Dados',err);
  } else {
    console.log(`Banco de Dados`, conn.config.connectionConfig.database.toUpperCase(), connection.state  , ` com Sucesso.`);
  }
});
exports.conn = conn;