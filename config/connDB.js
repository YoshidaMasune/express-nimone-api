const mysql = require('mysql2');
const { HOST_DB, USER_DB, PASSWORD_DB, NAME_DATABASE } = process.env

const conndb = mysql.createConnection({
   host: HOST_DB,
   user: USER_DB,
   password: PASSWORD_DB,
   database: NAME_DATABASE
});

module.exports = conndb;