const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const collection = "products";

const schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    default: 0,
  },
  thumbnail_url: {
    type: String,
  },
});

schema.plugin(mongoosePaginate);
const ProductsModel = model(collection, schema);
module.exports = ProductsModel;
