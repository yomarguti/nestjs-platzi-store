import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  CreateProductDto,
  FilterProductsDto,
  UpdateProductDto,
} from '../dtos/product.dto';
import { Product } from '../entities/product.entity';
import { ProductsService } from '../services/products.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@ApiTags('Products')
@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'List of products' })
  async getProducts(
    @Query() filterProductsDto: FilterProductsDto,
  ): Promise<Product[]> {
    return this.productsService.findAll(filterProductsDto);
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
