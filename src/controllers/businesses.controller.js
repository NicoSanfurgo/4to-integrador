const BusinessesService = require("../services/businesses.service");
const getSERVICES = require("../services/index.service");
const { HTTP_STATUS } = require("../utils/api.utils");
const { businessesService } = getSERVICES();

class BusinessesController {
  static async generateBusinesses(req, res, next) {
    const { total } = req.params;
    try {
      const businesses = await businessesService.generateBusinesses(total);
      const response = {
        success: true,
        businesses,
      };
      res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async getBusinesses(req, res, next) {
    try {
      const businesses = await businessesService.getBusinesses();
      const response = {
        success: true,
        businesses,
      };
      res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async getBusinessById(req, res, next) {
    const { bid } = req.params;
    try {
      const business = await businessesService.getBusinessById(bid);
      const response = {
        success: true,
        business,
      };
      res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async createBusiness(req, res, next) {
    const payload = req.body;
    try {
      const newBusiness = await businessesService.createBusiness(payload);
      const response = {
        success: true,
        newBusiness,
      };
      res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async addProductToBusiness(req, res, next) {
    const { bid } = req.params;
    const payload = req.body;
    try {
      const addedProductToBusiness =
        await businessesService.addProductToBusiness(bid, payload);
      const response = {
        success: true,
        addedProductToBusiness,
      };
      res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async updateBusinessById(req, res, next) {
    const { bid } = req.params;
    const payload = req.body;
    try {
      const updatedBusiness = await businessesService.updateBusinessById(
        bid,
        payload
      );
      const response = {
        success: true,
        updatedBusiness,
      };
      res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async deleteBusinessById(req, res, next) {
    const { bid } = req.params;
    try {
      const deletedBusiness = await businessesService.deleteBusinessById(bid);
      const response = {
        success: true,
        deletedBusiness,
      };
      res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = BusinessesController;
