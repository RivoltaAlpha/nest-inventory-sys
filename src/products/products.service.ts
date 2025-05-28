import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { mockProducts } from 'src/mock-data/products';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}
  products = mockProducts;

  findAll(): CreateProductDto[] {
    console.log('This action returns all products');
    return this.products;
  }

  findOne(id: number): CreateProductDto | undefined {
    const product = this.products.find((product) => product.product_id === id);
    if (!product) {
      console.log('Product does not exist!');
    }
    console.log(`This action returns a #${id} product`);
    return product;
  }
  
  create(product: UpdateProductDto) {
    const lastId = this.products[this.products.length - 1].product_id;

    if (
      product.name === undefined ||
      product.description === undefined ||
      product.sku === undefined ||
      product.category_id === undefined ||
      product.supplier_id === undefined ||
      product.price === undefined
    ) {
      throw new Error('All product fields are required');
    }

    const newProd = {
        product_id: lastId + 1,
        name: product.name,
        description: product.description,
        sku: product.sku,
        category_id: product.category_id,
        supplier_id: product.supplier_id,
        created_at: new Date(),
        updated_at: new Date(),
        price: product.price
      };

      this.products.push(newProd);
      console.log ('This action adds a new product');
      return newProd;
    }

  update(id: number, product: UpdateProductDto) {
    const index = this.products.findIndex((p) => p.product_id === id);
    if (index !== -1) {
      const updatedProduct = {
        product_id: id,
        name: product.name ?? this.products[index].name,
        description: product.description ?? this.products[index].description,
        sku: product.sku ?? this.products[index].sku,
        category_id: product.category_id ?? this.products[index].category_id,
        supplier_id: product.supplier_id ?? this.products[index].supplier_id,
        price: product.price ?? this.products[index].price,
        created_at: this.products[index].created_at,
        updated_at: new Date()
      };
      this.products[index] = updatedProduct;
      console.log(`This action updates a #${id} product`);
      return updatedProduct;
    } else {
      return `product with id ${id} not found`;
    }
  }

  remove(id: number): string {
    const index = this.products.findIndex((c) => c.product_id === id);
     if (index !== -1) {
      this.products.splice(index, 1);
      return `product with id ${id} deleted successfully`;
    }
    return `product with id ${id} not found`;
  }
}