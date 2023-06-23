const getDAOS = require("../models/daos/index.dao");
const { HttpError, HTTP_STATUS } = require("../utils/api.utils");
const { generateOrderErrorInfo } = require("./errors/info.error");
const { ordersDAO, businessesDAO, usersDAO, productsDAO } = getDAOS();

class OrdersService {
  async generateOrders(total) {
    if (!total || isNaN(total)) {
      throw new HttpError("Missing param", HTTP_STATUS.BAD_REQUEST);
    }
    const generatedOrders = await ordersDAO.generateOrders(total);
    if (!Array.isArray(generatedOrders) || !generatedOrders.length) {
      throw new HttpError("Orders array is not valid", HTTP_STATUS.BAD_REQUEST);
    }
    return generatedOrders;
  }
  async getOrders() {
    const orders = await ordersDAO.getOrders();
    return orders;
  }
  async getOrderById(id) {
    if (!id) {
      throw new HttpError("Missing param", HTTP_STATUS.BAD_REQUEST);
    }
    const order = await ordersDAO.getOrderById(id);
    if (!order) {
      throw new HttpError("Order not found", HTTP_STATUS.NOT_FOUND);
    }
    return order;
  }
  async createOrder(payload) {
    const { business, user, products } = payload;
    if (!business || !user) {
      throw new HttpError(
        generateOrderErrorInfo(payload),
        HTTP_STATUS.BAD_REQUEST
      );
    }
    const businessDB = await businessesDAO.getBusinessById(business);
    if (!businessDB) {
      throw new HttpError("Business not found", HTTP_STATUS.NOT_FOUND);
    }
    const userDB = await usersDAO.getUserById(user);
    if (!userDB) {
      throw new HttpError("User not found", HTTP_STATUS.NOT_FOUND);
    }
    if (!products || !Array.isArray(products) || !products.length) {
      throw new HttpError("Product array not valid", HTTP_STATUS.BAD_REQUEST);
    }
    const productsMap = products.reduce((acc, product) => {
      acc[product.reference] = product.quantity;
      return acc;
    }, {});
    const productsIds = Object.keys(productsMap);
    const productsFilter = { _id: { $in: productsIds } };
    const productsDB = await productsDAO.getProducts(productsFilter);
    if (!productsDB || !productsDB.length) {
      throw new HttpError("Please check product list", HTTP_STATUS.BAD_REQUEST);
    }
    let totalPrice = 0;
    const productsPayload = productsDB.map((product) => {
      const reference = product._id;
      const quantity = productsMap[reference];
      const price = product.price;
      totalPrice += quantity * price;
      return {
        reference,
        quantity,
        price,
      };
    });
    const order_number = Date.now();
    const newOrderPayload = {
      order_number,
      business,
      user,
      status: "PENDING",
      products: productsPayload,
      total_price: totalPrice,
    };
    const newOrder = await ordersDAO.createOrder(newOrderPayload);
    return newOrder;
  }
  async updateOrderById(id, resolution) {
    if (!resolution || !id) {
      throw new HttpError("Missing params", HTTP_STATUS.BAD_REQUEST);
    }
    if (resolution !== "COMPLETED" && resolution !== "REJECTED") {
      throw new HttpError(
        "Wrong value for resolution param",
        HTTP_STATUS.BAD_REQUEST
      );
    }
    const order = await ordersDAO.getOrderById(id);
    if (!order) {
      throw new HttpError("Order not found", HTTP_STATUS.NOT_FOUND);
    }
    order.status = resolution;
    const updatedOrder = await ordersDAO.updateOrderById(id, order);
    return updatedOrder;
  }
  async deleteOrderById(id) {
    if (!id) {
      throw new HttpError("Missing param", HTTP_STATUS.BAD_REQUEST);
    }
    const deletedOrder = await ordersDAO.deleteOrder(id);
    return deletedOrder;
  }
}

module.exports = OrdersService;