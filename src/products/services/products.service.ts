import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import {
  CreateProductDto,
  FilterProductsDto,
  UpdateProductDto,
} from '../dtos/product.dto';
import { Product } from '../entities/product.entity';
import config from '../../typed.config';
import { ProductsRepository } from '../repositories/products.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesRepository } from '../repositories/categories.repository';
import { BrandsRepository } from '../repositories/brands.repository';
import { Between, FindConditions } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    @InjectRepository(ProductsRepository)
    private productsRepository: ProductsRepository,
    @InjectRepository(CategoriesRepository)
    private categoriesRepository: CategoriesRepository,
    @InjectRepository(BrandsRepository)
    private brandsRepository: BrandsRepository,
  ) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productsRepository.create({ ...createProductDto });
    if (createProductDto.brandId) {
      const brand = await this.brandsRepository.findOne(
        createProductDto.brandId,
      );
      product.brand = brand;
    }

    if (createProductDto.categoriesId) {
      const categories = await this.categoriesRepository.findByIds(
        createProductDto.categoriesId,
      );
      product.categories = categories;
    }
    await this.productsRepository.save(product);
    return product;
  }

  testTypedConfigService() {
    console.log(this.configService.database);
  }

  async findAll(filterProductsDto?: FilterProductsDto): Promise<Product[]> {
    if (filterProductsDto) {
      const filter: FindConditions<Product> = {};
      const { limit, offset, maxPrice, minPrice } = filterProductsDto;

      if (minPrice && maxPrice) {
        filter.price = Between(minPrice, maxPrice);
      }

      return this.productsRepository.find({
        relations: ['brand'],
        take: limit,
        skip: offset,
        where: filter,
      });
    }
    return this.productsRepository.find({ relations: ['brand'] });
  }

  async findById(id: string): Promise<Product> {
    const product = await this.productsRepository.findOne(id, {
      relations: ['brand', 'categories'],
    });
    if (!product) throw new NotFoundException();
    return product;
  }

  async update(id: string, changes: UpdateProductDto): Promise<Product> {
    const product = await this.findById(id);
    if (changes.brandId) {
      const brand = await this.brandsRepository.findOne(changes.brandId);
      product.brand = brand;
    }
    Object.keys(changes).forEach((key) => {
      product[key] = changes[key];
    });
    await this.productsRepository.save(product);
    return product;
  }

  async removeCategoryFromProduct(
    id: string,
    categoryId: string,
  ): Promise<Product> {
    const product = await this.productsRepository.findOne(id, {
      relations: ['categories'],
    });

    product.categories = product.categories.filter(
      (category) => category.id !== categoryId,
    );

    return await this.productsRepository.save(product);
  }

  async addCategoryToProduct(id: string, categoryId: string): Promise<Product> {
    const product = await this.productsRepository.findOne(id, {
      relations: ['categories'],
    });
    const category = await this.categoriesRepository.findOne(categoryId);

    product.categories = [...product.categories, category];

    return await this.productsRepository.save(product);
  }

  async remove(id: string): Promise<Boolean> {
    const { affected } = await this.productsRepository.delete(id);
    if (!affected) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return true;
  }
}
