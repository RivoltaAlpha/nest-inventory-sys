import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { Product } from 'src/products/entities/product.entity';
import { Supplier } from 'src/suppliers/entities/supplier.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Inventory } from 'src/inventories/entities/inventory.entity';
import { Warehouse } from 'src/warehouses/entities/warehouse.entity';
import { Return } from 'src/returns/entities/return.entity';
import { Pricing } from 'src/pricings/entities/pricing.entity';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import { Role, User } from 'src/users/entities/user.entity';
import { Repository, DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';


@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>,
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
    @InjectRepository(Warehouse)
    private warehouseRepository: Repository<Warehouse>,
    @InjectRepository(Return)
    private returnRepository: Repository<Return>,
    @InjectRepository(Pricing)
    private pricingRepository: Repository<Pricing>,
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    private readonly dataSource: DataSource
  ) {}

  async seed() {
    this.logger.log('Seeding database...');

    try {
        await this.clearTables();

        const users = await this.seedUsers(10);
        const categories = await this.seedCategories(5);
        const suppliers = await this.seedSuppliers(5);
        const products = await this.seedProducts(20, categories, suppliers);
        const orders = await this.seedOrders(10, users, products);
        const warehouses = await this.seedWarehouses(5);
        const inventories = await this.seedInventories(20, products, warehouses);
        const returns = await this.seedReturns(5, orders);
        const pricings = await this.seedPricings(20, products);
        const transactions = await this.seedTransactions(10, orders);

      this.logger.log('Seeding completed successfully');
      return { message: 'Database seeded successfully' };

  }catch (error) {
    this.logger.error('Error seeding database', error);
    throw error;
  }
}

    private async clearTables() {
        this.logger.log('Clearing tables...');

            const queryRunner = this.dataSource.createQueryRunner();
            await queryRunner.connect();
            await queryRunner.startTransaction();
            try {
                await queryRunner.query('DELETE FROM "order_products_product"');
                // await queryRunner.query('DELETE FROM "product_orders_order"');
                await queryRunner.query('DELETE FROM "category"');
                await queryRunner.query('DELETE FROM "product"');
                await queryRunner.query('DELETE FROM "supplier"');
                await queryRunner.query('DELETE FROM "order"');
                await queryRunner.query('DELETE FROM "inventory"');
                await queryRunner.query('DELETE FROM "warehouse"');
                await queryRunner.query('DELETE FROM "return"');
                await queryRunner.query('DELETE FROM "pricing"');
                await queryRunner.query('DELETE FROM "transaction"');

            await queryRunner.commitTransaction();
            this.logger.log('All tables cleared successfully');
        } catch (error) {
            this.logger.error('Error clearing tables', error);
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }
    
    private async seedUsers(count: number): Promise<User[]> {
        this.logger.log(`Seeding ${count} users...`);
        const users = Array.from({ length: count }, () => {
        const user = new User();
        user.first_name = faker.person.firstName();
        user.last_name = faker.person.lastName();
        user.email = faker.internet.email();
        user.password = faker.internet.password();
        user.role = faker.helpers.arrayElement(['Admin', 'Manager', 'Warehouse', 'Supplier', 'Sales']) as Role;
        return user;
        });
        return this.userRepository.save(users);
    }
    
    private async seedCategories(count: number): Promise<Category[]> {
        this.logger.log(`Seeding ${count} categories...`);
        const categories = Array.from({ length: count }, () => {
        const category = new Category();
        category.name = faker.commerce.department();
        category.description = faker.commerce.productDescription();
        return category;
        });
        return this.categoryRepository.save(categories);
    }
    
      private async seedProducts(count: number, categories: Category[], suppliers: Supplier[]): Promise<Product[]> {
        this.logger.log(`Seeding ${count} products...`);
          const products = Array.from({ length: count }, () => {
          const product = new Product();
          product.name = faker.commerce.productName();
          product.description = faker.commerce.productDescription();
          product.sku = faker.string.uuid();
          product.price = parseFloat(faker.commerce.price());
          product.category = faker.helpers.arrayElement(categories);
          product.supplier = faker.helpers.arrayElement(suppliers);
          return product;
          });
          return this.productRepository.save(products);
      }
    
    private async seedSuppliers(count: number): Promise<Supplier[]> {
    this.logger.log(`Seeding ${count} suppliers...`);
        const suppliers = Array.from({ length: count }, () => {
        const supplier = new Supplier();
        supplier.name = faker.company.name();
        supplier.contact_info = faker.phone.number();
        return supplier;
        });
        return this.supplierRepository.save(suppliers);
    }
    
private async seedOrders(count: number, users: User[], products: Product[]): Promise<Order[]> {
    this.logger.log(`Seeding ${count} orders...`);
    if (!products.length) throw new Error('No products available to assign to orders');
    if (!users.length) throw new Error('No users available to assign to orders');
    const orders = Array.from({ length: count }, () => {
        const order = new Order();
        order.user = faker.helpers.arrayElement(users);
        // Ensure at least one product and filter out undefined
        order.products = [faker.helpers.arrayElement(products)].filter(Boolean);
        order.total_price = parseFloat(faker.commerce.price());
        order.status = faker.helpers.arrayElement(['Pending', 'Shipped', 'Completed', 'Returned']) as Order['status'];
        return order;
    });
    return this.orderRepository.save(orders);
}

    private async seedInventories(count: number, products: Product[], warehouses: Warehouse[]): Promise<Inventory[]> {
    this.logger.log(`Seeding ${count} inventories...`);
        const inventories = Array.from({ length: count }, () => {
        const inventory = new Inventory();
        inventory.product = faker.helpers.arrayElement(products);
        inventory.warehouse = faker.helpers.arrayElement(warehouses);
        inventory.stock_qty = faker.number.int({ min: 1, max: 100 });
        return inventory;
        });
        return this.inventoryRepository.save(inventories);
    }

    private async seedWarehouses(count: number): Promise<Warehouse[]> {
    this.logger.log(`Seeding ${count} warehouses...`);
        const warehouses = Array.from({ length: count }, () => {
        const warehouse = new Warehouse();
        warehouse.name = faker.company.name();
        warehouse.location = faker.location.city();
        return warehouse;
        });
        return this.warehouseRepository.save(warehouses);
    }

    private async seedReturns(count: number, orders: Order[]): Promise<Return[]> {
    this.logger.log(`Seeding ${count} returns...`);
        const returns = Array.from({ length: count }, () => {
        const returnItem = new Return();
        returnItem.order = faker.helpers.arrayElement(orders);
        returnItem.product = faker.helpers.arrayElement(orders.flatMap(order => order.products));
        returnItem.quantity = faker.number.int({ min: 1, max: 5 });
        returnItem.return_reason = faker.commerce.productAdjective();
        return returnItem;
        });
        return this.returnRepository.save(returns);
    }

    private async seedPricings(count: number, products: Product[]): Promise<Pricing[]> {
    this.logger.log(`Seeding ${count} pricings...`);
        const pricings = Array.from({ length: count }, () => {
        const pricing = new Pricing();
        pricing.product = faker.helpers.arrayElement(products);
        pricing.discount = faker.number.int({ min: 0, max: 50 });
        pricing.promotion = faker.commerce.productAdjective();
        pricing.start_date = faker.date.past();
        pricing.end_date = faker.date.future();
        return pricing;
        });
        return this.pricingRepository.save(pricings);
    }
    private async seedTransactions(count: number, orders: Order[]): Promise<Transaction[]> {
    this.logger.log(`Seeding ${count} transactions...`);
        const transactions = Array.from({ length: count }, () => {
        const transaction = new Transaction();
        transaction.product_id = faker.helpers.arrayElement(orders.flatMap(order => order.products)).product_id;
        transaction.price = parseFloat(faker.commerce.price());
        transaction.quantity = faker.number.int({ min: 1, max: 5 });
        transaction.type = faker.helpers.arrayElement(['Sale', 'Purchase', 'Return', 'Adjustment']) as Transaction['type'];
        return transaction;
        });
        return this.transactionRepository.save(transactions);
    }
    private readonly logger = new Logger(SeedService.name);
}