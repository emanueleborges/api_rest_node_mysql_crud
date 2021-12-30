const mysql = require('mysql')

var conn = mysql.createPool({
    user: "root",
    password: "",
    database: "mydb",
    host: "localhost",
    port: 3306
});
   

exports.conn = conn;