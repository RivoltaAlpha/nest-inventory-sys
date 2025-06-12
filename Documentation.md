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


## **Entities & Relationships**

- **User:** Has roles (Admin, Sales, Manager, Supplier, Warehouse)
- **Category:** Product categories
- **Product:** Belongs to a category and supplier
- **Supplier:** Supplies products
- **Order:** Placed by a user, contains products
- **Inventory:** Tracks product stock in warehouses
- **Warehouse:** Stores inventory
- **Return:** Linked to an order (one-to-one)
- **Pricing:** Product pricing and promotions
- **Transaction:** Records sales, purchases, returns, adjustments

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

1. **User (Sales) logs in** and gets a JWT token.
2. **Sales creates an order** for products and a customer.
3. **Order is saved** in the database and marked as "Pending."
4. **Manager reviews and approves/ships** the order, updating its status.
5. **Warehouse staff** see the order, prepare shipment, and update inventory.
6. **Order is shipped** and status is updated to "Shipped" or "Completed."
7. **If needed, a return is created** and processed, updating inventory and records.
8. **All actions are role-restricted** and logged for auditing.


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

## **API & Role-Based Access**

- **Authentication:** JWT tokens issued on login, with role encoded in token.
- **Role-based endpoints:**  
  - **Admin:** Full access (manage users, products, suppliers, warehouses, etc.)
  - **Sales:** View/create/update orders, view products/inventory, create returns/transactions.
  - **Manager:** Approve/ship orders, view products/orders.
  - **Supplier:** View/update own products and inventory, cannot view all orders.
  - **Warehouse:** Manage inventory, view warehouse products, handle shipping.

---

## 🔐 Security Overview

- JWT Guards protect sensitive routes.
- Passwords and refresh tokens are hashed.
- Only public routes: signup, signin, refresh.

---

## ✅ Summary

A backend built with **NestJS** and **TypeORM**,using the following  practices for modern Node.js applications:

- ✅ Entity relationships
- ✅ Secure JWT-based authentication
- ✅ Scalable inventory & transaction logic
- ✅ API documentation via Swagger
- ✅ Performance via Redis caching

---

