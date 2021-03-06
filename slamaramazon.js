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

        inquirer.prompt(
            {
                type: "list",
                message: "which department would you like to browse?",
                choices: departments,
                name: "department"
            }
        ).then(function (depot) {
            productSelect(depot.department)
        });
    });
};

function anotherPurchase() {
    inquirer.prompt(
        {
            type: "list",
            message: "would you like to try and buy something else?",
            choices: ["yes", "no"],
            name: "anotherPurchase"
        }
    ).then(function (answer) {

        if (answer.anotherPurchase === "yes") {

            start();
        } else {
            connection.end();
        };
    });
};

function productSelect(department) {
    connection.query(
        "SELECT * FROM products WHERE department = ?", [department], function (err, items) {
            if (err) throw err;

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
                    if (err) throw err;

                    if (purchase.quantity <= chosenItem[0].quantity) {

                        let bill = chosenItem[0].price * parseInt(purchase.quantity);
                        let newStock = chosenItem[0].quantity - parseInt(purchase.quantity);

                        console.log("Thank you for your purchase! your bill is $" + bill);

                        connection.query("UPDATE products SET ? WHERE ?", [{quantity: newStock}, {id: chosenItem[0].id}], function (err,res) {
                            if (err) throw err;

                            console.log("units of " + chosenItem[0].prod_name + " has been updated.")
                            
                            anotherPurchase();
                        });

                    } else {
                        console.log("we do not have that many in stock!");
                        anotherPurchase();
                    };
                });
            });
        });
}