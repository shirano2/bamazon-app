var inquirer = require("inquirer");
var mysql = require("mysql");
var cTable = require('console.table');
var chalk = require("chalk");

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
  supervise();
});

function supervise(){
    inquirer.prompt([
    {
        type: "rawlist",
        name: "select",
        message: "What would you like to do? (Use arrow keys)",
        choices: ["View Product Sales by Department","Create New Department", "Quit"]
    }
    ])
    .then(function(ans){
        if(ans.select=="View Product Sales by Department") {
            viewDepartment();
        } else if(ans.select=="Create New Department") {
            createDepartment();
        } else {
            exit();
        }
    })
}

function viewDepartment(){
    var query1="SELECT department_name, SUM(product_sales) AS product_sales FROM products GROUP BY department_name";
    var query2=
    "SELECT department_id, departments.department_name, over_head_costs, product_sales, product_sales-over_head_costs AS total_profit FROM ("
    +query1+
    ") products RIGHT JOIN departments ON departments.department_name=products.department_name";

    connection.query(query2, function (err, res) {
        if (err) throw err;
        var arr=[];
        for(var i=0; i<res.length;i++) {
          arr.push({department_id:res[i].department_id, department_name:res[i].department_name, over_head_costs:res[i].over_head_costs, product_sales:res[i].product_sales,total_profit:res[i].total_profit})
        }
        console.table(arr);
        supervise();
    })
}

function createDepartment(){
    inquirer.prompt([
        {
            name: "department_name",
            message: "What is the name of the department?",
        },
        {
            name: "over_head_costs",
            message: "What is the overhead cost of the department?",
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
        connection.query("INSERT INTO departments SET ?",ans,function (err, res) {
            if (err) throw err;
            console.log(chalk.blue("\r\n"+ans.department_name+" added to Bamazon\r\n"));
            supervise();
        })
    })
}

function exit() {
    connection.end();
    process.exit();
}