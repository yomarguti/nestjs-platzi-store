import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from '../dtos/product.dto';
import { Product } from '../entities/product.entity';
import { ProductsService } from '../services/products.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  async getProducts(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get('/:id')
  async getProductById(@Param('id') id: string): Promise<Product> {
    return this.productsService.findById(id);
  }

  @Post()
  async createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<Product> {
    return this.productsService.createProduct(createProductDto);
  }

  @Put(':id/category/:categoryId')
  async addCategory(
    @Param('id') id: string,
    @Param('categoryId') categoryId: string,
  ): Promise<Product> {
    return this.productsService.addCategoryToProduct(id, categoryId);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() payload: UpdateProductDto,
  ): Promise<Product> {
    return this.productsService.update(id, payload);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Boolean> {
    return this.productsService.remove(id);
  }

  @Delete(':id/category/:categoryId')
  async deleteCategory(
    @Param('id') id: string,
    @Param('categoryId') categoryId: string,
  ): Promise<Product> {
    return this.productsService.removeCategoryFromProduct(id, categoryId);
  }
}
