# bamazon-app


### What is this app for?

This app is simple. bamazon can handle all store's item. If you are a customer, then you can buy it using this app. If you are a manager, you can check the items and you can add more items or bring new items if necessary. If you are a supervisor, then you can check the total profits and also can create new categories. 

This is made by **Minseok Choi (https://github.com/shirano2)**.

bamazon can take following commands:

  * `node bamazonCustomer.js`

  * `node bamazonManager.js`

  * `node bamazonSupervisor.js`






### The GIF of How to Use it

1. `node bamazonCustomer.js`

![gif](https://shirano2.github.io/bamazon-app/images/customer.gif)


2. `node bamazonManager.js`

![gif](https://shirano2.github.io/bamazon-app/images/manager.gif)


3. `node bamazonSupervisor.js`

![gif](https://shirano2.github.io/bamazon-app/images/supervisor.gif)



## screenshots

1. `node bamazonCustomer.js`
* You can choose an item, then buy it

![Image of Customer](https://shirano2.github.io/bamazon-app/images/customer1.jpg)

* Then stock_quantity is reduced and product_sales is increased. Product_sales is stored which is the price of the product multiplied by the total number of the quantity purchased

![Image of Customer](https://shirano2.github.io/bamazon-app/images/customer2.jpg)



2. `node bamazonManager.js`
*  You can choose the following options

    * View Products for Sale

    ![Image of Manager](https://shirano2.github.io/bamazon-app/images/manager1.jpg)

    * View Low Inventory

    If stock_quantity is less than 5, show the item.
    
    ![Image of Manager](https://shirano2.github.io/bamazon-app/images/manager2.jpg)

    * Add to Inventory

    You can add more items to the stocks
    ![Image of Manager](https://shirano2.github.io/bamazon-app/images/manager3.jpg)

    * Add New Product
    You can add new items to the stocks
    ![Image of Manager](https://shirano2.github.io/bamazon-app/images/manager4.jpg)



3. `node bamazonSupervisor.js`
*  You can choose the following options

    * View Product Sales by Department

    You can check the total profit
    ![Image of Supervisor](https://shirano2.github.io/bamazon-app/images/supervisor1.jpg)

    * Create New Department

    You can add new department
    ![Image of Supervisor](https://shirano2.github.io/bamazon-app/images/supervisor2.jpg)

    After making it, you can add some items about new department with `node bamazonManager.js`
    ![Image of Supervisor](https://shirano2.github.io/bamazon-app/images/supervisor3.jpg)
