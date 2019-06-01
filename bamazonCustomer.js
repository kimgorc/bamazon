var mysql = require("mysql");

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
    runSearch();
  });
  
  function runSearch(){
  inquirer
    .prompt([
    {
      name: "itemID",
      type: "input",
      message:"What item id would you like to buy? (1-10)",
    },
    {
      name: "amount",
      type: "input",
      message: " How many would you like to purchase?",        
    }
    ])
    .then(function(quantity){
      var query = "SELECT stock_quantity FROM products WHERE ?"
      connection.query(query, [quantity.amount], function (err, res){
        for (var i = 0; i < res.length; i++) {
          console.log("stock_quantity" -1);
      }
      runSearch();
    });
    });
  };
      
  
  