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
    connection.query(`CREATE DATABASE IF NOT EXISTS mydb;`);
    connection.query(`CREATE TABLE IF NOT EXISTS mydb.usuarios (idusuarios INT NOT NULL AUTO_INCREMENT, email VARCHAR(45) NOT NULL, senha VARCHAR(45) NOT NULL, PRIMARY KEY (idusuarios))`);
    connection.query(`CREATE TABLE IF NOT EXISTS mydb.produtos (idproduto  INT NOT NULL AUTO_INCREMENT, nome VARCHAR(45) NOT NULL, preco FLOAT NOT NULL, PRIMARY KEY (idproduto))`);
    connection.query(`CREATE TABLE IF NOT EXISTS mydb.pedidos  (idpedidos  INT NOT NULL AUTO_INCREMENT, idproduto INT NOT NULL, quantidade FLOAT NOT NULL, PRIMARY KEY (idpedidos), INDEX fk_pedidos_produtos_idx (idproduto ASC) VISIBLE, CONSTRAINT fk_pedidos_produtos FOREIGN KEY (idproduto) REFERENCES mydb.produtos (idproduto) ON DELETE NO ACTION ON UPDATE NO ACTION)`);
    console.log(`Banco de Dados [`, conn.config.connectionConfig.database, `] Conectado.`);
  }
});
exports.conn = conn;