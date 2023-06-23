const { Router } = require("express");
const businessesRouter = require("./businesses/businesses.router");
const productsRouter = require("./products/products.router");
const usersRouter = require("./users/users.router");
const ordersRouter = require("./orders/orders.router");
const sessionsRouter = require("./sessions/sessions.router");
const swaggerJSDoc = require("swagger-jsdoc");
const { serve, setup } = require("swagger-ui-express");
const router = Router();

const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Coder-ecommerce API",
      description: "Ecommerce API",
      version: "1.0.0",
      contact: {
        name: "Axel Langerman",
        email: "axellangerman@yahoo.com",
      },
    },
  },
  apis: [`${process.cwd()}/src/docs/**/*.yaml`],
};

const specs = swaggerJSDoc(swaggerOptions);

router.use("/doc", serve, setup(specs));
router.use("/businesses", businessesRouter);
router.use("/products", productsRouter);
router.use("/users", usersRouter);
router.use("/orders", ordersRouter);
router.use("/sessions", sessionsRouter);

module.exports = router;