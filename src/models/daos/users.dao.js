const { generateUser } = require("../../utils/mock.utils");
const UsersModel = require("../schema/users.schema");

class UsersDAO {
  async generateUsers(total) {
    const users = Array.from({ length: total }, () => generateUser());
    const generatedUsers = await UsersModel.create(users);
    return generatedUsers;
  }

  async getUsers() {
    const users = await UsersModel.find().lean();
    return users;
  }

  async getUserById(id) {
    const user = await UsersModel.findById({ _id: id }).lean();
    return user;
  }

  async getUserByEmail(email) {
    const user = await UsersModel.findOne({ email: email }).lean();
    return user;
  }

  async createUser(payload) {
    const newUser = await UsersModel.create(payload);
    return newUser;
  }

  async updateUserById(id, payload) {
    const updatedUser = await UsersModel.updateOne(
      { _id: id },
      { $set: payload }
    );
    return updatedUser;
  }

  async deleteUserById(id) {
    const deletedUser = await UsersModel.deleteOne({ _id: id });
    return deletedUser;
  }
}

module.exports = UsersDAO;
