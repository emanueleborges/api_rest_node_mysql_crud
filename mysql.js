const mysql = require('mysql')

var conn = mysql.createPool({
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT
});

conn.on('connection', function (connection) {
    console.log('Banco de Dados: Conectado com Sucesso');
      connection.on('error', function (err) {
      console.error(new Date(), 'Banco de Dados: error', err.code);
    });
    connection.on('close', function (err) {
      console.error(new Date(), 'Banco de Dados: fechado', err);
    });
  
  });
   
exports.conn = conn;