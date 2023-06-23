const SaveUserDTO = require("../models/dtos/users.dto");
const getSERVICES = require("../services/index.service");
const { HTTP_STATUS } = require("../utils/api.utils");
const { usersService } = getSERVICES();

class UsersController {
  static async generateUsers(req, res, next) {
    const { total } = req.params;
    try {
      const users = await usersService.generateUsers(total);
      const response = {
        success: true,
        users,
      };
      res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async getUsers(req, res, next) {
    try {
      const users = await usersService.getUsers();
      const response = {
        success: true,
        users,
      };
      res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async getUserById(req, res, next) {
    const { uid } = req.params;
    try {
      const user = await usersService.getUserById(uid);
      const response = {
        success: true,
        user,
      };
      res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async createUser(req, res, next) {
    const payload = req.body;
    try {
      const userPayload = new SaveUserDTO(payload);
      const newUser = await usersService.createUser(userPayload);
      const response = {
        success: true,
        newUser,
      };
      res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async updateUserById(req, res, next) {
    const { uid } = req.params;
    const payload = req.body;
    try {
      const updatedUser = await usersService.updateUserById(uid, payload);
      const response = {
        success: true,
        updatedUser,
      };
      res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async deleteUserById(req, res, next) {
    const { uid } = req.params;
    try {
      const deletedUser = await usersService.deleteUserById(uid);
      const response = {
        success: true,
        deletedUser,
      };
      res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UsersController;
