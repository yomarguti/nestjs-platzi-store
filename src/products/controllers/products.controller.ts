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

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getProducts(): Product[] {
    return this.productsService.findAll();
  }

  @Get('/:id')
  getProductById(@Param('id', ParseIntPipe) id: number): Product {
    return this.productsService.findById(id);
  }

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto): Product {
    return this.productsService.createProduct(createProductDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateProductDto) {
    return this.productsService.update(+id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
