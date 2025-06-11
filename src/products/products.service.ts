import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Inventory } from 'src/inventories/entities/inventory.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
  ) {}

  async findAll(): Promise<Product[]> {
    console.log('This action returns all products');
    return this.productsRepository.find();
  }

  async findOne(id: number): Promise<Product | undefined> {
    const product = await this.productsRepository.findOne({
      where: { product_id: id },
    });
    if (!product) {
      console.log('Product does not exist!');
      return undefined;
    }
    console.log(`This action returns a #${product.product_id} product`);
    return product;
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    if (
      !createProductDto.name ||
      !createProductDto.description ||
      !createProductDto.sku ||
      !createProductDto.category_id ||
      !createProductDto.supplier_id ||
      !createProductDto.price
    ) {
      throw new Error('All product fields are required');
    }
    const newProduct = this.productsRepository.create({
      ...createProductDto,
      createdAt: createProductDto.created_at || new Date(),
      updatedAt: createProductDto.updated_at || new Date(),
    });
    return this.productsRepository.save(newProduct);
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product | string> {
    const product = await this.productsRepository.findOne({
      where: { product_id: id },
    });
    if (!product) {
      return `product with id ${id} not found`;
    }
    const updatedProduct = this.productsRepository.merge(product, {
      ...updateProductDto,
      updatedAt: new Date(),
    });
    return this.productsRepository.save(updatedProduct);
  }

  async remove(id: number): Promise<string> {
    const result = await this.productsRepository.delete(id);
    if (result.affected && result.affected > 0) {
      return `product with id ${id} deleted successfully`;
    }
    return `product with id ${id} not found`;
  }

  // product suppliers
  async productSuppliers (supplier_id: number ) {
    this.productsRepository.find({
      where: {

      },
      relations: [],
      select: {
          product_id: true,
          name: true,
          price: true,
          supplier: {
            name: true,
            contact_info: true
          }
      }
    })
  }

  // order by category
  async orderByCategory(category_id: number): Promise<Product[]> {
    return this.productsRepository.find({
      where: { category: { category_id } },
      relations: ['category'],
      select: {
        product_id: true,
        name: true,
        price: true,
        category: {
          name: true,
          description: true,
        },
      },
    });
  }

  // order by supplier
  async orderBySupplier(supplier_id: number): Promise<Product[]> {
    return this.productsRepository.find({
      where: { supplier: { supplier_id } },
      relations: ['supplier'],
      select: {
        product_id: true,
        name: true,
        price: true,
        supplier: {
          name: true,
          contact_info: true,
        },
      },
    });
  }

  // order by price
  async orderByPrice(order: 'ASC' | 'DESC'): Promise<Product[]> {
    return this.productsRepository.find({
      order: { price: order },
      select: {
        product_id: true,
        name: true,
        price: true,
        supplier: {
          name: true,
          contact_info: true,
        },
      },
    });
  }

  // order by sku
  async orderBySku(order: 'ASC' | 'DESC'): Promise<Product[]> {
    return this.productsRepository.find({
      order: { sku: order },
      select: {
        product_id: true,
        name: true,
        price: true,
        supplier: {
          name: true,
          contact_info: true,
        },
      },
    });
  }
}
