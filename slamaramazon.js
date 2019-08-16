const inquirer = require("inquirer");
const mysql = require("mysql");

let connection = mysql.createConnection({
    host: "LocalHost",

    port: 3306,

    user: "root",

    password: "",
    database: "slamaram_DB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connection made as " + connection.threadId);
})