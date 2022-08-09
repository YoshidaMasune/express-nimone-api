const mysql = require('mysql2');

const conndb = mysql.createConnection({
   host: "localhost",
   user: "root",
   password: "",
   database: "suwan"
});

module.exports = conndb;