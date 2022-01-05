const mysql = require('mysql')

var conn = mysql.createPool({
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    password: process.env.MYSQL_PASSWORD
});

conn.getConnection((err,connection)=> {
  if(err)
  throw err;
  console.log(`Banco de Dados`, conn.config.connectionConfig.database.toUpperCase(), `Connectado com Sucesso.`);
  connection.release();
});
   
exports.conn = conn;