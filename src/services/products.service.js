const getDAOS = require("../models/daos/index.dao");
const { HTTP_STATUS, HttpError } = require("../utils/api.utils");
const { generateProductErrorInfo } = require("./errors/info.error");
const { productsDAO } = getDAOS();

class ProductsService {
  async generateProducts(total) {
    if (!total || isNaN(total)) {
      throw new HttpError("Missing param", HTTP_STATUS.BAD_REQUEST);
    }
    const generatedProducts = await productsDAO.generateProducts(total);
    if (!Array.isArray(generatedProducts) || !generatedProducts.length) {
      throw new HttpError(
        "Products array is not valid",
        HTTP_STATUS.BAD_REQUEST
      );
    }
    return generatedProducts;
  }
  async getProducts(filter = {}) {
    const products = await productsDAO.getProducts(filter);
    return products;
  }
  async getProductById(id) {
    if (!id) {
      throw new HttpError("Missing param", HTTP_STATUS.BAD_REQUEST);
    }
    const product = await productsDAO.getProductById(id);
    if (!product) {
      throw new HttpError("Product not found", HTTP_STATUS.NOT_FOUND);
    }
    return product;
  }
  async createProduct(product) {
    const { title, price, stock, thumbnail_url } = product;
    if (
      !title ||
      !price ||
      isNaN(price) ||
      !stock ||
      isNaN(stock) ||
      !thumbnail_url
    ) {
      throw new HttpError("Missing required fields", HTTP_STATUS.BAD_REQUEST);
    }
    if (
      typeof product.title !== "string" ||
      typeof product.price !== "number"
    ) {
      throw new HttpError(
        generateProductErrorInfo(product),
        HTTP_STATUS.BAD_REQUEST
      );
    }
    const newProductPayload = {
      title,
      price,
      stock,
      thumbnail_url,
    };
    const newProduct = await productsDAO.createProduct(newProductPayload);
    return newProduct;
  }
  async updateProductById(id, product) {
    const { title, price, stock, thumbnail_url } = product;
    if (
      !title ||
      !price ||
      isNaN(price) ||
      !stock ||
      isNaN(stock) ||
      !thumbnail_url
    ) {
      throw new HttpError("Missing required fields", HTTP_STATUS.BAD_REQUEST);
    }
    if (!id) {
      throw new HttpError("Missing param", HTTP_STATUS.BAD_REQUEST);
    }
    const updatedProduct = await productsDAO.updateProductById(id, product);
    return updatedProduct;
  }
  async deleteProductById(id) {
    if (!id) {
      throw new HttpError("Missing param", HTTP_STATUS.BAD_REQUEST);
    }
    const deletedProduct = await productsDAO.deleteProductById(id);
    return deletedProduct;
  }
}

module.exports = ProductsService;