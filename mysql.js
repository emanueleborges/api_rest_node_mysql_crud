const mysql = require('mysql')

console.log('Conectando ...');

var conn = mysql.createPool({
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    password: process.env.MYSQL_PASSWORD
});

conn.getConnection((err,connection)=> {
  if(err){
    console.log('Banco de Dados Sem Conexão. Erro: ',err.code);
  } else {
    console.log(`Banco de Dados [`, conn.config.connectionConfig.database, `] Conectado.`);
  }
});
exports.conn = conn;