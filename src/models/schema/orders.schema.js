const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const collection = "orders";

const schema = new Schema({
  order_number: {
    type: String,
    required: true,
  },
  business: {
    type: Schema.Types.ObjectId,
    ref: "businesses",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  status: {
    type: String,
    enum: ["PENDING", "COMPLETED", "REJECTED"],
    default: "PENDING",
  },
  products: [
    {
      reference: {
        type: Schema.Types.ObjectId,
        ref: "products",
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  total_price: {
    type: Number,
    default: 0,
  },
});

schema.plugin(mongoosePaginate);
const OrdersModel = model(collection, schema);
module.exports = OrdersModel;
