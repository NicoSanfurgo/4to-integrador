const BusinessesService = require("./businesses.service");
const MailingService = require("./mailing.service");
const OrdersService = require("./orders.service");
const ProductsService = require("./products.service");
const UsersService = require("./users.service");

const businessesService = new BusinessesService();
const ordersService = new OrdersService();
const productsService = new ProductsService();
const usersService = new UsersService();
const mailingService = new MailingService();

const getSERVICES = () => {
  return {
    businessesService,
    ordersService,
    productsService,
    usersService,
    mailingService,
  };
};

module.exports = getSERVICES;
