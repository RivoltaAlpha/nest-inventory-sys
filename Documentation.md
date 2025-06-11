# Inventory Management System – Overview

## 🚀 Core Modules & Entities

- **Users**: Employees or admins who interact with the system.
- **Products**: Items managed in inventory.
- **Suppliers**: Companies or people supplying products.
- **Categories**: Product groupings (e.g., Electronics).
- **Orders**: Purchases made by users for products.
- **Transactions**: Records of product sales or purchases.
- **Warehouses**: Physical locations storing products.
- **Inventories**: Stock levels of products in warehouses.
- **Returns**: Returned products from orders.
- **Pricings**: Discounts or promotions on products.
- **Authentication**: JWT-based login, signup, refresh, and signout.

---

## 🔗 Entity Relationships

- **User ↔ Orders**: Each order is placed by a user.
- **Order ↔ Products**: An order can have multiple products (many-to-many).
- **Product ↔ Category**: Each product belongs to a category.
- **Product ↔ Supplier**: Each product has a supplier.
- **Product ↔ Inventory ↔ Warehouse**: Inventory tracks product stock per warehouse.
- **Order ↔ Returns**: Returns are linked to orders and products.
- **Product ↔ Pricing**: Products can have multiple pricing entries (discounts/promotions).
- **Product ↔ Transactions**: Transactions record sales/purchases of products.

---

## ⚙️ Logic & Implementation

### 🔐 Authentication

- **Signup**: Hashes password, saves user, generates and stores refresh token.
- **Signin**: Verifies password, issues access/refresh tokens, stores hashed refresh token.
- **Signout**: Deletes (nullifies) hashed refresh token in DB.
- **Refresh**: Validates refresh token, issues new tokens.

### 🧩 CRUD Operations

Standard create, read, update, delete operations for:
- Users
- Products
- Suppliers
- Categories
- Warehouses  
> All endpoints are JWT-protected except for signup/signin. since they are public!

### 📦 Inventory Management

- **Inventories**:  
  Each record links a product to a warehouse and tracks `stock_qty`.
- **Stock Updates**:  
  Inventory quantities are updated when orders or transactions occur.

### 🛒 Orders & Transactions

- **Orders**:  
  Created by users, contain one or more products, and have a status.
- **Transactions**:  
  Record each sale or purchase, affecting inventory and possibly pricing.

### ↩️ Returns

- **Returns**:  
  Linked to orders and products with reasons and timestamps.  
  Inventory is incremented when a return is processed.

### 💰 Pricing

- Products can have:
  - Discounts
  - Promotions
  - Start/end dates

### 🧠 Caching

- **Redis**:  
  Caching layer for performance.
- **Cache Endpoints**:  
  For setting, getting, and monitoring cache metrics.

---

## 🛠 Implementation Details

- **NestJS**:  
  Modular architecture with:
  - DTOs for validation
  - Guards for route protection
  - Interceptors for caching
- **TypeORM**:  
  Manages entity relationships and DB operations.
- **Swagger**:  
  Auto-generated API docs using decorators like `@ApiProperty`.
- **JWT Auth**:  
  Uses access and refresh tokens, with hashed refresh tokens stored in DB.
- **Error Handling**:  
  NestJS exception filters for common errors (e.g., 401, 404).

---

## 🧪 Example Workflows

### 📥 Product Order Flow

1. User logs in and receives a JWT.
2. User creates an order via `POST /orders/create` with product IDs.
3. Order is saved with user and product relationships.
4. Inventory is decremented for each ordered product.
5. Transaction is recorded.
6. If returned, a return record is saved and inventory is incremented.

### 🔁 Inventory Update

- A sale or restock updates the related product's inventory quantity in the appropriate warehouse.

---


# Roles 😎
Here are the typical tasks for each role in your Inventory Management System:

---

### **Admin**
- Manage users (create, update, delete, assign roles)
- Manage all products, categories, suppliers, and warehouses
- View and manage all orders, transactions, and reports
- Set pricing, discounts, and promotions
- Full access to all system features

---

### **Manager**
- View and approve/reject orders
- View sales and inventory reports
- Oversee inventory levels and warehouse operations
- Coordinate between sales, warehouse, and suppliers

---

### **Warehouse**
- View and update inventory levels
- Manage product storage and stock movements
- Process incoming shipments and outgoing orders
- Track inventory across multiple warehouses

---

### **Sales**
- View available products and inventory
- Create and manage customer orders
- Track order status and details
- Shipping orders

---

### **Supplier**
- View and update their own product listings
- Manage stock supplied to the warehouse
- View orders related to their products
- Update product availability and pricing

---

## 🔐 Security Overview

- JWT Guards protect sensitive routes.
- Passwords and refresh tokens are hashed.
- Only public routes: signup, signin, refresh.

---

## 🧾 Swagger 

- Uses swagger for rich API documentation.

---

## ✅ Summary

A backend built with **NestJS** and **TypeORM**,using the following  practices for modern Node.js applications:

- ✅ Entity relationships
- ✅ Secure JWT-based authentication
- ✅ Scalable inventory & transaction logic
- ✅ API documentation via Swagger
- ✅ Performance via Redis caching

---

