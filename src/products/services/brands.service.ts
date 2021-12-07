import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dto';
import { Brand } from '../entities/brand.entity';
import { BrandsRepository } from '../repositories/brands.repository';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(BrandsRepository)
    private brandsRepository: BrandsRepository,
  ) {}

  async createBrand(createBrandDto: CreateBrandDto): Promise<Brand> {
    const brand = this.brandsRepository.create({ ...createBrandDto });
    await this.brandsRepository.save(brand);
    return brand;
  }

  async findAll(): Promise<Brand[]> {
    return await this.brandsRepository.find();
  }

  async findById(id: string): Promise<Brand> {
    const brand = await this.brandsRepository.findOne(id);
    if (!brand) throw new NotFoundException();
    return brand;
  }

  async update(id: string, changes: UpdateBrandDto): Promise<Brand> {
    const brand = await this.findById(id);
    this.brandsRepository.merge(brand, changes);
    await this.brandsRepository.save(brand);
    return brand;
  }

  async remove(id: string): Promise<Boolean> {
    const { affected } = await this.brandsRepository.delete(id);
    if (!affected) throw new NotFoundException(`Brand #${id} not found`);
    return true;
  }
}
