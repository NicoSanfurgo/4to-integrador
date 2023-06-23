const generateUserErrorInfo = (user) => {
  return `One or more properties were incomplete or not valid.
    List of required properties:
    * first_name: needs to be a string, recived ${user.first_name}
    * last_name: needs to be a string, recived ${user.last_name}
    * email: needs to be a string, recived ${user.email}`;
};

const generateOrderErrorInfo = (order) => {
  if (typeof order.order_number !== "string") {
    return `One or more properties were incomplete or not valid.
    List of required properties:
    * order_number: needs to be a string, recived ${order.order_number}`;
  }
};

const generateBusinessErrorInfo = (business) => {
  return `One or more properties were incomplete or not valid.
    List of required properties:
    * name: needs to be a string, recived ${business.name}`;
};

const generateProductErrorInfo = (product) => {
  return `One or more properties were incomplete or not valid.json
    List of required properties:
    * title: needs to be a string, recived ${product.title}
    * price: needs to be a number, recived ${product.price}`;
};

module.exports = {
  generateUserErrorInfo,
  generateOrderErrorInfo,
  generateBusinessErrorInfo,
  generateProductErrorInfo,
};
