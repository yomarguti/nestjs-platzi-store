import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { CreateProductDto, UpdateProductDto } from '../dtos/product.dto';
import { Product } from '../entities/product.entity';
import config from '../../typed.config';
import { ProductsRepository } from '../repositories/products.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    @InjectRepository(ProductsRepository)
    private productsRepository: ProductsRepository,
  ) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productsRepository.create({ ...createProductDto });
    await this.productsRepository.save(product);
    return product;
  }

  testTypedConfigService() {
    console.log(this.configService.database);
  }

  async findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  async findById(id: string): Promise<Product> {
    const product = await this.productsRepository.findOne(id);
    if (!product) throw new NotFoundException();
    return product;
  }

  async update(id: string, changes: UpdateProductDto): Promise<Product> {
    const product = await this.findById(id);
    Object.keys(changes).forEach((key) => {
      product[key] = changes[key];
    });
    await this.productsRepository.save(product);
    return product;
  }

  async remove(id: string): Promise<Boolean> {
    const { affected } = await this.productsRepository.delete(id);
    if (!affected) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return true;
  }
}
