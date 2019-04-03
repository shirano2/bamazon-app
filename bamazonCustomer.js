var inquirer = require("inquirer");
var mysql = require("mysql");
var cTable = require("console.table");
var chalk = require("chalk");
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
    var arr=[];
    for(var i=0; i<res.length;i++) {
      arr.push({item_id:res[i].item_id, product_name:res[i].product_name, product_sales:res[i].product_sales, department_name:res[i].department_name,price:res[i].price,stock_quantity:res[i].stock_quantity})
    }
    console.table(arr);
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
                console.log(chalk.red("\r\nThat item is not on our list!\r\n"));
                displayItems(ask);
            } else if(res[0].stock_quantity<ans.quantity) {
                console.log(chalk.red("\r\nInsufficient quantity!\r\n"));
                displayItems(ask);
            } else {
                connection.query("UPDATE products SET ? WHERE ?",
                    [
                      {
                        stock_quantity: res[0].stock_quantity-parseInt(ans.quantity),
                        product_sales:res[0].product_sales+parseFloat(ans.quantity)*res[0].price
                      },
                      {
                        item_id: ans.item_id
                      },
                    ],
                    function(err, res) {
                      console.log(chalk.blue("\r\nYour purchase is success!!\r\n"));
                      displayItems(ask);
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