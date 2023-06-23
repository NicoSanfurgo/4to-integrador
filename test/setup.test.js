const request = require("supertest")("http://localhost:8080");
const expect = require("chai").expect;
const mongoose = require("mongoose");

before(async () => {
  await mongoose.connect(
    "mongodb+srv://jorelmaro:coder123house456@coder.3c0d1.mongodb.net/demopb41?retryWrites=true&w=majority"
  );
});

after(async () => {
  mongoose.connection.close();
});

describe("Test cases", function () {
  it("POST /api/products/mockingproducts/:total - generate a number of products", async function () {
    const response = await request.post("/api/products/mockingproducts/5");
    expect(response.status).to.eql(200);
    expect(response.body.products).to.have.length(5);
  });
  it("POST /api/products/mockingproducts/:total - Should respond 400 when users send wrong data", async function () {
    const response = await request.post("/api/products/mockingproducts/0");
    expect(response.status).to.eql(400);
  });
  it("GET /api/products - returns all products", async function () {
    const response = await request.get("/api/products");
    expect(response.status).to.eql(200);
    expect(response.body.products).to.have.length(95);
  });
  it("GET /api/products/:pid - returns a product by ID", async function () {
    const response = await request.get(
      "/api/products/6435c22c471d4a8ba3436905"
    );
    expect(response.status).to.eql(200);
    expect(response.body.product._id).to.be.ok;
  });
  it("GET /api/products/:pid -  Should respond 400 when users send wrong data", async function () {
    const response = await request.get("/api/products/6435c22c471d4");
    expect(response.status).to.eql(500);
  });
  it("GET /api/products/:pid -  Should respond 404 when the product not exist", async function () {
    const response = await request.get(
      "/api/products/6435c22c471d4a8ba555555a"
    );
    expect(response.status).to.eql(404);
  });
  it("POST /api/products - create a product", async function () {
    const mockProduct = {
      title: "tortilla de calabaza",
      price: 1700,
      stock: 2000,
      thumbnail_url: "tortilla.png",
    };
    const response = await request.post("/api/products").send(mockProduct);
    expect(response.status).to.eql(200);
    expect(response.body.newProduct._id).to.be.ok;
    expect(response.body.newProduct.title).to.be.eql("tortilla de calabaza");
  });
  it("POST /api/products - Should respond 400 when users send wrong data", async function () {
    const mockProduct = {
      price: 130,
      stock: 100,
      thumbnail_url: "milang.png",
    };
    const response = await request.post("/api/products").send(mockProduct);
    expect(response.status).to.eql(400);
  });
  it("PUT /api/products/:pid - update a product by ID", async function () {
    const mockProduct = {
      title: "Xiaomi Bird",
      price: 357,
      stock: 57,
      thumbnail_url: "xiaomibird.png",
    };
    const response = await request
      .put("/api/products/6435c22c471d4a8ba3436905")
      .send(mockProduct);
    expect(response.status).to.eql(200);
  });
  it("PUT /api/products/:pid - Should respond 400 when users send wrong data", async function () {
    const mockProduct = {
      price: 357,
      stock: 57,
      thumbnail_url: "xiaomibird.png",
    };
    const response = await request
      .put("/api/products/6435c22c471d4a8ba3436905")
      .send(mockProduct);
    expect(response.status).to.eql(400);
  });
  it("DELETE /api/products/:pid - Should delete a product by ID", async function () {
    const response = await request.delete(
      "/api/products/6435c22c471d4a8ba3436905"
    );
    expect(response.status).to.eql(200);
  });
  it("DELETE /api/products/:pid - Should respond 400 when users send wrong data", async function () {
    const response = await request.delete("/api/products/");
    expect(response.status).to.eql(404);
  });
});
