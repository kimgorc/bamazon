DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
    id INTEGER(20) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(45) NOT NULL,
    department_name VARCHAR(45) NOT NULL,
    price INTEGER(100) NOT NULL,
    stock_quantity INTEGER (10),
    PRIMARY KEY (id) 
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("tissues", "personal care", 7, 10);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("hammer", "home improvement", 30, 10);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("dress", "clothing", 45, 10);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("computer", "electronics", 100, 10);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("pajamas", "clothing", 15, 10);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("camera", "electronics", 45, 10);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("bananas", "food", 1, 10);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("hair brush", "personal care", 10, 10);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("watch", "electronics", 45, 10);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("scissors", "household", 10, 10);

SELECT * FROM products;