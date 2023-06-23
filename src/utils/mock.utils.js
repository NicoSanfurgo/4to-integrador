const { faker } = require("@faker-js/faker");

const generateProduct = () => {
  return {
    id: faker.database.mongodbObjectId(),
    title: faker.commerce.product(),
    price: faker.commerce.price(),
    stock: faker.number.int(500),
    thumbnail_url: faker.image.url(),
  };
};

const generateBusiness = () => {
  const totalProducts = faker.number.int({ min: 1, max: 15 });
  const products = Array.from({ length: totalProducts }, () =>
    generateProduct()
  );
  const productIds = [];
  products.map((product) => productIds.push(product.id));
  return {
    id: faker.database.mongodbObjectId(),
    name: faker.person.jobTitle(),
    products: productIds,
  };
};

const generateOrder = () => {
  const totalProducts = faker.number.int({ min: 1, max: 15 });
  const products = Array.from({ length: totalProducts }, () =>
    generateProduct()
  );
  const productsInfo = [];
  products.map((product) => {
    const newProduct = {
      quantity: faker.string.numeric(2),
      price: product.price,
    };
    productsInfo.push(newProduct);
  });
  return {
    id: faker.database.mongodbObjectId(),
    order_number: faker.finance.pin(8),
    business: faker.database.mongodbObjectId(),
    user: faker.database.mongodbObjectId(),
    status: "PENDING",
    products: productsInfo,
    total_price: faker.string.numeric(5),
  };
};

const generateUser = () => {
  const totalOrders = faker.number.int({ min: 1, max: 15 });
  const orders = Array.from({ length: totalOrders }, () => generateOrder());
  const ordersIds = [];
  orders.map((order) => ordersIds.push(order.id));
  return {
    id: faker.database.mongodbObjectId(),
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    github_username: faker.internet.userName(),
    role: "USER",
    orders: ordersIds,
  };
};

module.exports = {
  generateProduct,
  generateBusiness,
  generateOrder,
  generateUser,
};
