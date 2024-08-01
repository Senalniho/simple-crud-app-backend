const request = require("supertest");
const app = require("../index");
const Product = require("../models/product.model");

describe("Product API", () => {
  let productId;

  beforeEach(async () => {
    await Product.deleteMany({}); // Clear the database before each test
    const product = await Product.create({
      name: "Test Product",
      quantity: 10,
      price: 100,
    });
    productId = product._id;
  });

  it("should get all products", async () => {
    const res = await request(app).get("/api/products");
    expect(res.status).toBe(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "Test Product",
          quantity: 10,
          price: 100,
        }),
      ])
    );
  });

  it("should get a specific product", async () => {
    const res = await request(app).get(`/api/products/${productId}`);
    expect(res.status).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        name: "Test Product",
        quantity: 10,
        price: 100,
      })
    );
  });

  it("should create a new product", async () => {
    const newProduct = {
      name: "New Product",
      quantity: 5,
      price: 50,
    };
    const res = await request(app).post("/api/products").send(newProduct);
    expect(res.status).toBe(201);
    expect(res.body).toEqual(
      expect.objectContaining({
        name: "New Product",
        quantity: 5,
        price: 50,
      })
    );
  });

  it("should update a product", async () => {
    const updatedProduct = {
      name: "Updated Product",
      quantity: 15,
      price: 150,
    };
    const res = await request(app)
      .put(`/api/products/${productId}`)
      .send(updatedProduct);
    expect(res.status).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        name: "Updated Product",
        quantity: 15,
        price: 150,
      })
    );
  });

  it("should delete a product", async () => {
    const res = await request(app).delete(`/api/products/${productId}`);
    expect(res.status).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        message: "Product deleted successfully",
      })
    );
  });

  it("should return 404 for non-existent product", async () => {
    const res = await request(app).get("/api/products/1234567890");
    expect(res.status).toBe(404);
  });
});
