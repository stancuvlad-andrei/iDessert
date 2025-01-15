# iDessert 🍰

**iDessert** is a full-stack web application designed for bakery enthusiasts. It allows users to explore bakeries, view their products, leave reviews, and even place orders. The project is built with **React** for the frontend, **Express** for the backend, and **MySQL** as the database. The frontend is styled using **Tailwind CSS**.

## Features

- **User Authentication**: Register and login functionality for users.
- **Bakery Exploration**: Browse bakeries, view their details, and see their products.
- **Product Management**: Add, update, and delete products for bakeries (for owners).
- **Reviews**: Users can leave reviews for bakeries.
- **Checkout**: Users can place orders for products.
- **Telemetry**: Bakery owners can view visits, orders, and revenue statistics.

## Technologies Used

- **Frontend**: React, Tailwind CSS
- **Backend**: Express.js
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Tokens)

## API Endpoints

### Authentication

- **POST /api/auth/register**: Register a new user.
  - Request Body: `{ username, email, password, isOwner }`
  - Response: `{ message: "User registered successfully" }`

- **POST /api/auth/login**: Login a user.
  - Request Body: `{ email, password }`
  - Response: `{ token, isOwner }`

- **GET /api/auth/account**: Fetch user details (requires authentication).
  - Response: `{ id, username, email, role }`

### Bakeries

- **GET /api/bakeries/bakeries**: Fetch all bakeries with optional search query.
  - Query Params: `search`
  - Response: `{ bakeries: [...] }`

- **GET /api/bakeries/bakeries/:id**: Fetch details of a specific bakery.
  - Response: `{ bakery: { id, name, address, city, phone, email, website, reviews: [...], products: [...] } }`

- **POST /api/bakeries/bakeries**: Add a new bakery (requires authentication).
  - Request Body: `{ name, address, city, phone, email, website }`
  - Response: `{ message: "Bakery added successfully", bakeryId }`

- **DELETE /api/bakeries/bakeries/:id**: Delete a bakery (requires authentication).
  - Response: `{ message: "Bakery deleted successfully" }`

### Products

- **POST /api/bakeries/:id/products**: Add a new product to a bakery (requires authentication).
  - Request Body: `{ name, description, price, quantity }`
  - Response: `{ message: "Product added successfully" }`

- **GET /api/bakeries/:bakeryId/products/:productId**: Fetch a specific product from a bakery.
  - Response: `{ product: { id, name, description, price, quantity } }`

- **PUT /api/bakeries/:bakeryId/products/:productId**: Update a product in a bakery (requires authentication).
  - Request Body: `{ name, description, price, quantity }`
  - Response: `{ message: "Product updated successfully" }`

- **DELETE /api/bakeries/:bakeryId/products/:productId**: Delete a product from a bakery (requires authentication).
  - Response: `{ message: "Product removed successfully" }`

### Reviews

- **POST /api/bakeries/:id/reviews**: Add a review to a bakery.
  - Request Body: `{ review, sentiment }`
  - Response: `{ message: "Review added successfully" }`

### Checkout

- **POST /api/bakeries/checkout**: Process a checkout (requires authentication).
  - Request Body: `{ cart, bakeryId }`
  - Response: `{ message: "Checkout successful" }`

### Telemetry

- **GET /api/bakeries/:id/telemetry**: Fetch bakery telemetry (visits, orders, revenue) (requires authentication).
  - Response: `{ telemetry: { visits, orders, revenue } }`

- **POST /api/bakeries/:id/visit**: Log a visit to a bakery.
  - Response: `{ message: "Visit logged successfully" }`
