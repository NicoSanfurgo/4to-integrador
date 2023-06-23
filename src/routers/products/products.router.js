const { Router } = require("express");
const ProductsController = require("../../controllers/products.controller");
const router = Router();

router.post("/mockingproducts/:total", ProductsController.generateProducts);
router.get("/", ProductsController.getProducts);
router.get("/:pid", ProductsController.getProductById);
router.post("/", ProductsController.createProduct);
router.put("/:pid", ProductsController.updateProductById);
router.delete("/:pid", ProductsController.deleteProductById);

module.exports = router;