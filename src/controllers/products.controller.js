const getSERVICES = require("../services/index.service");
const ProductsService = require("../services/products.service");
const { HTTP_STATUS } = require("../utils/api.utils");
const { productsService } = getSERVICES();

class ProductsController {
  static async generateProducts(req, res, next) {
    const { total } = req.params;
    try {
      const products = await productsService.generateProducts(total);
      const response = {
        success: true,
        products,
      };
      res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async getProducts(req, res, next) {
    const { filter } = req.params;
    try {
      const products = await productsService.getProducts(filter);
      const response = {
        success: true,
        products,
      };
      res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async getProductById(req, res, next) {
    const { pid } = req.params;
    try {
      const product = await productsService.getProductById(pid);
      const response = {
        success: true,
        product,
      };
      res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async createProduct(req, res, next) {
    const payload = req.body;
    try {
      const newProduct = await productsService.createProduct(payload);
      const response = {
        success: true,
        newProduct,
      };
      res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async updateProductById(req, res, next) {
    const { pid } = req.params;
    const payload = req.body;
    try {
      const updatedProduct = await productsService.updateProductById(
        pid,
        payload
      );
      const response = {
        success: true,
        updatedProduct,
      };
      res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async deleteProductById(req, res, next) {
    const { pid } = req.params;
    try {
      const deletedProduct = await productsService.deleteProductById(pid);
      const response = {
        success: true,
        deletedProduct,
      };
      res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductsController;
