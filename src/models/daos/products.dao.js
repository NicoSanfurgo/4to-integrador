const ProductsModel = require("../schema/products.schema");
const { generateProduct } = require("../../utils/mock.utils");

class ProductsDAO {
  async generateProducts(total) {
    const products = Array.from({ length: total }, () => generateProduct());
    const generatedProducts = await ProductsModel.create(products);
    return generatedProducts;
  }

  async getProducts(filter = {}) {
    const products = await ProductsModel.find(filter).lean();
    return products;
  }

  async getProductById(id) {
    const product = await ProductsModel.findOne({ _id: id }).lean();
    return product;
  }

  async createProduct(product) {
    const createdProduct = await ProductsModel.create(product);
    return createdProduct;
  }

  async updateProductById(id, product) {
    const updatedProduct = await ProductsModel.updateOne(
      { _id: id },
      { $set: product }
    ).lean();
    return updatedProduct;
  }

  async deleteProductById(id) {
    const deletedProduct = await ProductsModel.deleteOne({ _id: id });
    return deletedProduct;
  }
}

module.exports = ProductsDAO;
