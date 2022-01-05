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

/*
exports.execute = (query, params=[] ) => {
  return new Promise((resolve, reject) => {
    conn.getConnection((error, conn) => {
      if (error) {
        reject(error)
      } else {
        resolve(conn)
        conn.query(query, params, (error, results, fields))
        conn.release();
        if (error){
          reject(error)
        } else {
          resolve(error)
        }
      }
    })
  })
}
*/

exports.conn = conn;