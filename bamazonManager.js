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
  list();
});

function list() {
    inquirer.prompt([
    {
        type: "rawlist",
        name: "select",
        message: "What would you like to do? (Use arrow keys)",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "QUIT"]
    }
    ])
    .then(function(ans) {
        if(ans.select=="View Products for Sale") {
            displayItems(list);
        } else if(ans.select=="View Low Inventory") {
            lowInventory();
        } else if(ans.select=="Add to Inventory") {
            addInventory();
        } else if(ans.select=="Add New Product") {
            addNew();
        } else {
            exit();
        }
    })
}

function displayItems(func) {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    for(var i=0; i<res.length;i++) {
        console.log("%s %s %d %s %f %d",res[i].item_id,res[i].product_name,res[i].product_sales,res[i].department_name,res[i].price,res[i].stock_quantity);
    }
    func();
  })
}

function lowInventory(){
    connection.query("SELECT * FROM products", function (err, res) { 
        if (err) throw err;
        for(var i=0; i<res.length;i++) {
            if(res[i].stock_quantity<=5) {
                console.log("%s %s %d %s %f %d",res[i].item_id,res[i].product_name,res[i].product_sales,res[i].department_name,res[i].price,res[i].stock_quantity);
            }
        }
        list();
    })
}

function addInventory(){
    inquirer.prompt([
        {
            name: "item_id",
            message: "What is the ID of the item you want to add to?",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            name: "quantity",
            message: "How many would you like to add?",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                } else {
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
                list();
            } else {
                var name = res[0].product_name;
                connection.query("UPDATE products SET ? WHERE ?",
                    [
                    {
                        stock_quantity: res[0].stock_quantity+parseInt(ans.quantity)
                    },
                    {
                        item_id: ans.item_id
                    }
                    ],
                    function(err, res) {
                        console.log("Successfully added "+ans.quantity+" "+name);
                        list();
                    }
                );
            }
        })
    })
}

function addNew(){
    var arr = [];
    connection.query("SELECT department_name FROM products",function (err, res) {
        if (err) throw err;
        for(var i=0;i<res.length;i++) {
            if(arr.indexOf(res[i].department_name)<0) {
                arr.push(res[i].department_name);
            }
        }
        inquirer.prompt([
            {
                name: "product_name",
                message: "What is the name of the product to add new?",
                validate: function(value) {
                    if (value !="") {
                        return true;
                    } else {
                        return false;
                    }
                }
            },
            {
                name: "department_name",
                message: "Which department does this product fall into?",
                type: "list",
                choices: arr
            },
            {
                name: "price",
                message: "How much does it cost?",
                validate: function(value) {
                    if (isNaN(value) === false && parseInt(value)>0) {
                        return true;
                    } else {
                        return false;
                    }
                }
            },
            {
                name: "stock_quantity",
                message: "How many do we have?",
                validate: function(value) {
                    if (isNaN(value) === false && parseInt(value)>0) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        ])
        .then(function(ans) {
            connection.query("INSERT INTO products SET ?",ans,function (err, res) {
                if (err) throw err;
                console.log(ans.product_name+" added to Bamazon");
                list();
            })
        })
    });
}

function exit() {
    connection.end();
    process.exit();
}