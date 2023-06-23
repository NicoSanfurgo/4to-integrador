const getDAOS = require("../models/daos/index.dao");
const { HTTP_STATUS, HttpError } = require("../utils/api.utils");
const { generateBusinessErrorInfo } = require("./errors/info.error");
const { businessesDAO, productsDAO } = getDAOS();

class BusinessesService {
  async generateBusinesses(total) {
    if (!total || isNaN(total)) {
      throw new HttpError("Missing param", HTTP_STATUS.BAD_REQUEST);
    }
    const generatedBusinesses = await businessesDAO.generateBusinesses(total);
    if (!Array.isArray(generatedBusinesses) || !generatedBusinesses.length) {
      throw new HttpError(
        "Businesses array is not valid",
        HTTP_STATUS.BAD_REQUEST
      );
    }
    return generatedBusinesses;
  }
  async getBusinesses() {
    const businesses = await businessesDAO.getBusinesses();
    return businesses;
  }
  async getBusinessById(id) {
    if (!id) {
      throw new HttpError("Missing param", HTTP_STATUS.BAD_REQUEST);
    }
    const business = await businessesDAO.getBusinessById(id);
    if (!business) {
      throw new HttpError("Business not found", HTTP_STATUS.NOT_FOUND);
    }
    return business;
  }
  async createBusiness(business) {
    const { name, products } = business;
    if (!name || !products) {
      throw new HttpError("Missing required field", HTTP_STATUS.BAD_REQUEST);
    }
    if (typeof business.name !== "string") {
      throw new HttpError(
        generateBusinessErrorInfo(business),
        HTTP_STATUS.BAD_REQUEST
      );
    }
    if (!Array.isArray(products) || !products.length) {
      throw new HttpError(
        "Products array is not valid",
        HTTP_STATUS.BAD_REQUEST
      );
    }

    const productFilter = { _id: { $in: products } };
    const productsDB = await productsDAO.getProducts(productFilter);
    if (!productsDB || !productsDB.length) {
      throw new HttpError(
        "Products array is not valid. Please check the content",
        HTTP_STATUS.BAD_REQUEST
      );
    }
    const newBusinessPayload = {
      name,
      products: productsDB.map((product) => product._id),
    };
    const newBusiness = await businessesDAO.createBusiness(newBusinessPayload);
    return newBusiness;
  }
  async updateBusinessById(id, business) {
    const { name, products } = business;
    if (!name || !products) {
      throw new HttpError("Missing required field", HTTP_STATUS.BAD_REQUEST);
    }
    if (!Array.isArray(products) || !products.length) {
      throw new HttpError(
        "Products array is not valid",
        HTTP_STATUS.BAD_REQUEST
      );
    }
    if (!id) {
      throw new HttpError("Missing param", HTTP_STATUS.BAD_REQUEST);
    }
    const updatedBusiness = await businessesDAO.updateBusinessById(
      id,
      business
    );
    return updatedBusiness;
  }
  async addProductToBusiness(businessId, product) {
    if (!businessId || !product) {
      throw new HttpError("Missing param", HTTP_STATUS.BAD_REQUEST);
    }

    const productDB = await productsDAO.getProductById(product._id);
    if (!productDB) {
      throw new HttpError("Product not found", HTTP_STATUS.NOT_FOUND);
    }

    const businessDB = await businessesDAO.getBusinessById(businessId);
    if (!businessDB) {
      throw new HttpError("Business not found", HTTP_STATUS.NOT_FOUND);
    }

    const response = await businessesDAO.addProductToBusiness(
      businessId,
      product
    );
    return response;
  }
  async deleteBusinessById(id) {
    if (!id) {
      throw new HttpError("Missing param", HTTP_STATUS.BAD_REQUEST);
    }
    const deletedBusiness = await businessesDAO.deleteBusinessById(id);
    return deletedBusiness;
  }
}

module.exports = BusinessesService;