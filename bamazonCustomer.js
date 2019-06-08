var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "password",
    database: "bamazon_db"
  });

  connection.connect(function(err) {
    if (err) throw err;
    start();
  });
  
  function start(){
  connection.query("SELECT * FROM products", function(err, results){
    if (err) throw err;
  
    inquirer
      .prompt([
      {
        name: "choice",
        type: "rawlist",
        choices: function(){
          var choiceArray = [];
          for (var i=0; i < results.length; i++){
            choiceArray.push(results[i].product_name );
          }
          return choiceArray;
      },
        message:"What item id would you like to buy?",
      },
      {
        name: "amount",
        type: "input",
        message: " How many would you like to purchase?"
      }
    ])
    .then(function(answer){
      var chosenItem;
      for (var i=0; i < results.length; i++){
        if (results[i].product_name === answer.amount){
          chosenItem = results[i];
        }
        // determine if bid was high enough
        if (results[i].stock_quantity >= parseInt(answer.amount)) {
          // bid was high enough, so update db, let the user know, and start over
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: chosenItem.stock_quantity - answer.amount
              },
              {
                product_name: chosenItem.product_name 
              }
            ],
            function(error) {
              if (error) throw err;
              console.log("Order placed successfully!");
              start();
            }
          );
        }
        else {
          // bid wasn't high enough, so apologize and start over
          console.log("Not enought items in stock. Try again...");
          connection.end();
        }
        };    
  });
  });
}
   


  