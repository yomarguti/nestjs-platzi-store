import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dto';
import { Category } from '../entities/category.entity';
import { CategoriesRepository } from '../repositories/categories.repository';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoriesRepository)
    private categoriesRepository: CategoriesRepository,
  ) {}

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const category = this.categoriesRepository.create({ ...createCategoryDto });
    await this.categoriesRepository.save(category);
    return category;
  }

  async findAll(): Promise<Category[]> {
    return await this.categoriesRepository.find();
  }

  async findById(id: string): Promise<Category> {
    const category = await this.categoriesRepository.findOne(id);
    if (!category) throw new NotFoundException();
    return category;
  }

  async update(id: string, changes: UpdateCategoryDto): Promise<Category> {
    const category = await this.findById(id);
    Object.keys(changes).forEach((key) => {
      category[key] = changes[key];
    });
    await this.categoriesRepository.save(category);
    return category;
  }

  async remove(id: string): Promise<Boolean> {
    const { affected } = await this.categoriesRepository.delete(id);
    if (!affected) throw new NotFoundException(`Category #${id} not found`);
    return true;
  }
}
