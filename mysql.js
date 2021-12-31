const mysql = require('mysql')

var conn = mysql.createPool({
    user: "root",
    password: "",
    database: "mydb",
    host: "localhost",
    port: 3306
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