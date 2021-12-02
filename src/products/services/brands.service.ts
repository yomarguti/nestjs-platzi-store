import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dto';
import { Brand } from '../entities/brand.entity';

@Injectable()
export class BrandsService {
  private counterId = 1;
  private brands: Brand[] = [
    {
      id: 1,
      name: 'Apple',
      image: 'https://google.com/apple.jpg',
    },
  ];

  createBrand(createBrandDto: CreateBrandDto) {
    this.counterId++;
    const brand = {
      id: this.counterId,
      ...createBrandDto,
    };
    this.brands.push(brand);
    return brand;
  }

  findAll(): Brand[] {
    return this.brands;
  }

  findById(id: number): Brand {
    const brand = this.brands.find((brand) => brand.id === id);
    if (!brand) throw new NotFoundException();
    return brand;
  }

  update(id: number, changes: UpdateBrandDto) {
    const brand = this.findById(id);
    const index = this.brands.findIndex((item) => item.id === id);
    this.brands[index] = {
      ...brand,
      ...changes,
    };
    return this.brands[index];
  }

  remove(id: number) {
    const index = this.brands.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    this.brands.splice(index, 1);
    return true;
  }
}
