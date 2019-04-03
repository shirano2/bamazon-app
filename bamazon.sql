DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
  item_id INT AUTO_INCREMENT,
  product_name VARCHAR(40) NOT NULL,
  product_sales DECIMAL(50,2),
  department_name VARCHAR(40),
  price DECIMAL(10,2),
  stock_quantity INTEGER(100),
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, product_sales, department_name, price, stock_quantity) 
values 
('spider-man', 0, "movie", 49.95, 150),
('deadpool', 0, "movie", 19.95, 50),
('sekiro', 0, "game", 9.95, 650),
('dark soul', 0, "game", 3.95, 350),
('socks', 0, "necessities", 1.25, 30),
('ramen', 0, "food", 0.99, 200),
('kimchi', 0, "food", 12.99, 220),
('jeans',0,"apparel", 21.40, 3),
('guent',0,"card-game", 12.00, 40),
('monopoly',0,"card-game", 14.00, 50);

CREATE TABLE departments(
  department_id INTEGER NOT NULL,
  department_name VARCHAR(40) NOT NULL,
  over_head_costs INTEGER(50) NOT NULL
);

SELECT * FROM products;