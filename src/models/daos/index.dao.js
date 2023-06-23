const BusinessesDAO = require("./businesses.dao");
const OrdersDAO = require("./orders.dao");
const ProductsDAO = require("./products.dao");
const UsersDAO = require("./users.dao");

const businessesDAO = new BusinessesDAO();
const productsDAO = new ProductsDAO();
const usersDAO = new UsersDAO();
const ordersDAO = new OrdersDAO();

const getDAOS = () => {
  return {
    businessesDAO,
    productsDAO,
    usersDAO,
    ordersDAO,
  };
};

module.exports = getDAOS;
