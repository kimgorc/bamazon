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
        if(results[i].id === answer.choice){
          chosenItem = results[i];
        }
      }
      
      if (chosenItem.quantity_remaining < parseInt(answer.amount)){
        connection.query(
          "UPDATE products SET ? WHERE ?",
          [
            {
              quantity_remaining: answer.amount
            },
            {
              id: chosenItem.id
            }
          ],
          function(error){
            if (error) throw err;
            console.log("Stock quantitiy updated");
            start();
          }
        );
      }
      else{
        console.log("There are no items left in stock. Try again..");
        start();
      }
    });
  });
  };
      
  
  