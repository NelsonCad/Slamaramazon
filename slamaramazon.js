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


function anotherPurchase() {
    inquirer.prompt(
        {
            type: "list",
            message: "would you like to buy something else?",
            choices: ["yes", "no"],
            name: "anotherPurchase"
        }
    ).then(function (answer) {

        if (answer.anotherPurchase === "yes") {
            start();
        } else {
            connection.end();
        }
    });
}


function start() {
    connection.query("SELECT * FROM departments", function (err, depots) {
        if (err) throw err;

        let departments = [];

        for (i = 0; i < depots.length; i++) {
            departments.push(depots[i].title);
        };

        inquirer.prompt(
            {
                type: "list",
                message: "which department would you like to search into?",
                choices: departments,
                name: "department"
            }
        ).then(function (depot) {
            productSelect(depot.department)

        }).catch(function (err) {
            console.log(err);
            connection.end();
        });

    });
}

function productSelect(department) {
    connection.query(
        "SELECT prod_name, price, quantity FROM products WHERE department = ?", [department], function (err, items) {
            if (err) {
                console.log(err);
                connection.end();
            };

            console.table(items);

            let products = [];

            for (i = 0; i < items.length; i++) {
                products.push(items[i].prod_name);
            }

            inquirer.prompt([
                {
                    type: "list",
                    message: "what item would you like to buy?",
                    choices: products,
                    name: "product"
                },
                {
                    type: "input",
                    message: "How many would you like to buy?",
                    name: "quantity"
                }
            ]).then(function (purchase) {
                
                connection.query("SELECT * FROM products WHERE prod_name = ?", [purchase.product], function (err, chosenItem) {
                    if (err) {
                        console.log(err);
                        connection.end();
                    }
                    if (purchase.quantity <= chosenItem) {
                        console.log("thank you for your purchase of this item! you bill is $" + (chosenItem.price * purchase.quantity))
                        anotherPurchase();
                    } else {
                        console.log("we do not have that many in stock!");
                    }


                })
                connection.end();

            }).catch(function(err) {
                console.log(err);
                connection.end();
            })

        });

}