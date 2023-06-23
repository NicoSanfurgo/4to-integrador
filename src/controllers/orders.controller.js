const getSERVICES = require("../services/index.service");
const OrdersService = require("../services/orders.service");
const { HTTP_STATUS } = require("../utils/api.utils");
const { ordersService } = getSERVICES();

class OrdersController {
  static async generateOrders(req, res, next) {
    const { total } = req.params;
    try {
      const orders = await ordersService.generateOrders(total);
      const response = {
        success: true,
        orders,
      };
      res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async getOrders(req, res, next) {
    try {
      const orders = await ordersService.getOrders();
      const response = {
        success: true,
        orders,
      };
      res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async getOrderById(req, res, next) {
    const { oid } = req.params;
    try {
      const order = await ordersService.getOrderById(oid);
      const response = {
        success: true,
        order,
      };
      res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async createOrder(req, res, next) {
    const payload = req.body;
    try {
      const newOrder = await ordersService.createOrder(payload);
      const response = {
        success: true,
        newOrder,
      };
      res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async updateOrderById(req, res, next) {
    const { oid } = req.params;
    const { resolution } = req.body;
    try {
      const updatedOrder = await ordersService.updateOrderById(oid, resolution);
      const response = {
        success: true,
        updatedOrder,
      };
      res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async deleteOrderById(req, res, next) {
    const { oid } = req.params;
    try {
      const deletedOrder = await ordersService.deleteOrderById(oid);
      const response = {
        success: true,
        deletedOrder,
      };
      res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = OrdersController;
