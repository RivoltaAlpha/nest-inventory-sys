import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    console.log('This action returns all products');
    return this.productsRepository.find();
  }

  async findOne(id: number): Promise<Product | undefined> {
    const product = await this.productsRepository.findOne({ where: { product_id: id } });
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

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product | string> {
    const product = await this.productsRepository.findOne({ where: { product_id: id } });
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
}