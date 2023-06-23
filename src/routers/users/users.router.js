const { Router } = require("express");
const UserController = require("../../controllers/users.controller");
const router = Router();

router.post("/mockingusers/:total", UserController.generateUsers);
router.get("/", UserController.getUsers);
router.get("/:uid", UserController.getUserById);
router.post("/", UserController.createUser);
router.put("/:uid", UserController.updateUserById);
router.delete("/:uid", UserController.deleteUserById);

module.exports = router;
