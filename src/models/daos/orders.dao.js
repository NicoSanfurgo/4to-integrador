const { generateOrder } = require("../../utils/mock.utils");
const OrdersModel = require("../schema/orders.schema");

class OrdersDAO {
  async generateOrder(total) {
    const orders = Array.from({ length: total }, () => generateOrder());
    const generatedOrders = await OrdersModel.create(orders);
    return generatedOrders;
  }

  async getOrders() {
    const orders = await OrdersModel.find().lean();
    return orders;
  }

  async getOrderById(id) {
    const order = await OrdersModel.findOne({ _id: id }).lean();
    return order;
  }

  async createOrder(payload) {
    const newOrder = await OrdersModel.create(payload);
    return newOrder;
  }

  async updateOrderById(id, payload) {
    const updatedOrder = await OrdersModel.updateOne(
      { _id: id },
      { $set: payload }
    );
    return updatedOrder;
  }

  async deleteOrder(id) {
    const deletedOrder = await OrdersModel.deleteOne({ _id: id });
    return deletedOrder;
  }
}

module.exports = OrdersDAO;
