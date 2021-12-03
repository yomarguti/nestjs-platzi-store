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
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dto';
import { Category } from '../entities/category.entity';
import { CategoriesService } from '../services/categories.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}
  @Get()
  getCategories(): Category[] {
    return this.categoriesService.findAll();
  }

  @Get('/:id')
  getCategoryById(@Param('id', ParseIntPipe) id: number): Category {
    return this.categoriesService.findById(id);
  }

  @Post()
  createCategory(@Body() createCategoryDto: CreateCategoryDto): Category {
    return this.categoriesService.createCategory(createCategoryDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateCategoryDto) {
    return this.categoriesService.update(+id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
