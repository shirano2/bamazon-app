var inquirer = require("inquirer");
var mysql = require("mysql");
//var Table = require("cli-table");

var connection = mysql.createConnection({
  host     : "localhost",
  port     : "3307",
  user     : "root",
  password : "1234",
  database : "bamazon"
});
 
connection.connect(function(err){
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  displayItems(ask);
});

function displayItems(func) {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    for(var i=0; i<res.length;i++) {
        console.log("%s %s %d %s %f %d",res[i].item_id,res[i].product_name,res[i].product_sales,res[i].department_name,res[i].price,res[i].stock_quantity);
    }
    func();
  })
}

function ask() {
    inquirer.prompt([
        {
            name: "item_id",
            message: "What is the ID of the item you want to purchase? [Quit with Q]",
            validate: function(value) {
              if (isNaN(value) === false) {
                return true;
              } else if(value=="q" || value=="Q") {
                exit();
              }
              else {
                return false;
              }
            }
        },
        {
            name: "quantity",
            message: "How many would you like to purchase? [Quit with Q]",
            validate: function(value) {
              if (isNaN(value) === false && parseInt(value)>0) {
                return true;
              } else if(value=="q" || value=="Q") {
                exit();
              }
              else {
                return false;
              }
            }
        }
      ])
      .then(function(ans) {
        connection.query("SELECT * FROM products WHERE ?",{item_id:ans.item_id}, function (err, res) {
            if (err) throw err;
            if(res.length==0) {
                console.log("That item is not on our list!")
                displayItems();
            } else if(res[0].stock_quantity<ans.quantity) {
                console.log("Insufficient quantity!")
                displayItems();
            } else {
                connection.query("UPDATE products SET ? WHERE ?",
                    [
                      {
                        stock_quantity: res[0].stock_quantity-parseInt(ans.quantity)
                      },
                      {
                        item_id: ans.item_id
                      }
                    ],
                    function(err, res) {
                      console.log(res.affectedRows + " products updated!\n");
                      displayItems();
                    }
                );
            }
        })
    })
}

function exit() {
    connection.end();
    process.exit();
}