# Product API

This project is a simple RESTful API built with Node.js, Express, and MongoDB. It provides CRUD (Create, Read, Update, Delete) operations for managing products.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Unit Testing](#unit-testing)
- [Dependencies](#dependencies)
- [License](#license)

## Installation

To set up this project on your local machine, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/product-api.git
   cd product-api
   ```

2. **Install the required dependencies:**

   Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed. Then run:

   ```bash
   npm install
   ```

3. **Set up MongoDB:**

   - Create a MongoDB database using MongoDB Atlas or a local instance.
   - Replace the connection string in `app.js` with your MongoDB connection string.

4. **Start the server:**

   ```bash
   npm start
   ```

   The server will start on port 3000 by default.

## Usage

Once the server is running, you can interact with the API using tools like [Postman](https://www.postman.com/) or `curl`.

## API Endpoints

### Products

- **GET /api/products**: Retrieve all products.
- **GET /api/products/:id**: Retrieve a specific product by its ID.
- **POST /api/products**: Create a new product.
- **PUT /api/products/:id**: Update an existing product by its ID.
- **DELETE /api/products/:id**: Delete a product by its ID.

### Example Requests

- **GET all products:**

  ```bash
  curl -X GET http://localhost:3000/api/products
  ```

- **POST a new product:**

  ```bash
  curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name": "Sample Product", "quantity": 10, "price": 19.99}'
  ```

## Project Structure

```
.
├── controllers
│   └── product.controller.js  # Handlers for product-related routes
├── models
│   └── product.model.js       # Mongoose schema and model for Product
├── routes
│   └── product.route.js       # Express routes for Product API
├── app.js                     # Main application file
├── package.json               # Project dependencies and scripts
└── README.md                  # Project documentation
```

## Unit Testing

Unit tests are included to ensure the reliability of the API. The tests are written using a testing framework like [Jest](https://jestjs.io/) or [Mocha](https://mochajs.org/).

### Running Tests

To run the unit tests, use the following command:

```bash
npm test
```

### Sample Unit Tests

Here is a basic structure for writing unit tests for the `Product` model and controller functions:

```javascript
const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const Product = require("../models/product.model");

describe("Product API", () => {
  beforeAll(async () => {
    // Connect to test database
    await mongoose.connect("mongodb://localhost:27017/testdb", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    // Cleanup test database
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });

  it("should create a new product", async () => {
    const response = await request(app).post("/api/products").send({
      name: "Test Product",
      quantity: 5,
      price: 100,
    });
    expect(response.status).toBe(201);
    expect(response.body.name).toBe("Test Product");
  });

  it("should retrieve all products", async () => {
    const response = await request(app).get("/api/products");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should retrieve a product by ID", async () => {
    const product = await Product.create({
      name: "Test Product",
      quantity: 5,
      price: 100,
    });
    const response = await request(app).get(`/api/products/${product._id}`);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe(product.name);
  });

  it("should update a product", async () => {
    const product = await Product.create({
      name: "Test Product",
      quantity: 5,
      price: 100,
    });
    const response = await request(app)
      .put(`/api/products/${product._id}`)
      .send({ quantity: 10 });
    expect(response.status).toBe(200);
    expect(response.body.quantity).toBe(10);
  });

  it("should delete a product", async () => {
    const product = await Product.create({
      name: "Test Product",
      quantity: 5,
      price: 100,
    });
    const response = await request(app).delete(`/api/products/${product._id}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Product deleted successfully");
  });
});
```

## Dependencies

- **express**: Fast, unopinionated, minimalist web framework for Node.js.
- **mongoose**: Elegant MongoDB object modeling for Node.js.
- **jest**: Delightful JavaScript testing framework.
- **supertest**: HTTP assertions made easy via superagent.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
