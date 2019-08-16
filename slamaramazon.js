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
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;

        console.table(results);

        let items = [];

        for (i = 0; i < results.length; i++) {
            items.push(JSON.stringify(results[i].prod_name));
            product.push(results[i]);
        };

        inquirer
            .prompt({
                type: "list",
                message: "what would you like to buy?",
                choices: items,
                name: "product-choice"
            }).then(function (choice) {
                console.log(choice);

            }).catch(function (err) {
                console.log(err);
                connection.end();
            });
        connection.end();
    })
}