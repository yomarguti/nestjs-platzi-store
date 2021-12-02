import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dto';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoriesService {
  private counterId = 1;
  private categories: Category[] = [
    {
      id: 1,
      name: 'Home',
    },
  ];

  createCategory(createCategoryDto: CreateCategoryDto) {
    this.counterId++;
    const category = {
      id: this.counterId,
      ...createCategoryDto,
    };
    this.categories.push(category);
    return category;
  }

  findAll(): Category[] {
    return this.categories;
  }

  findById(id: number): Category {
    const category = this.categories.find((category) => category.id === id);
    if (!category) throw new NotFoundException();
    return category;
  }

  update(id: number, changes: UpdateCategoryDto) {
    const category = this.findById(id);
    const index = this.categories.findIndex((item) => item.id === id);
    this.categories[index] = {
      ...category,
      ...changes,
    };
    return this.categories[index];
  }

  remove(id: number) {
    const index = this.categories.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    this.categories.splice(index, 1);
    return true;
  }
}
