const inquirer = require("inquirer");
const mysql = require("mysql");

let connection = mysql.createConnection({
    host: "LocalHost",

    port: 3306,

    user: "root",

    password: "",
    database: "slamarama_db"
});

connection.connect(function (err) {
    if (err) throw err;

    start();
});

function start() {
    connection.query("SELECT * FROM departments", function (err, depots) {
        if (err) throw err;

        let departments = [];

        for (i = 0; i < depots.length; i++) {
            departments.push(depots[i].title);
        };

        inquirer
            .prompt({
                type: "list",
                message: "which department would you like to search into?",
                choices: departments,
                name: "department"
            }).then(function (choice) {
                

            }).catch(function (err) {
                console.log(err);
                connection.end();
            });
        connection.end();
    })
}