const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: null,
    database: "fooddelivery"
});

connection.connect(function (error) {
    if (error) throw error;
    // console.log("Database Connection Created");
});
module.exports = connection;