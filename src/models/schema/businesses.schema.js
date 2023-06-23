const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const collection = "businesses";

const schema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "products",
    },
  ],
});

schema.plugin(mongoosePaginate);
const BusinessesModel = model(collection, schema);
module.exports = BusinessesModel;
