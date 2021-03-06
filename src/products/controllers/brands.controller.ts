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
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dto';
import { Brand } from '../entities/brand.entity';
import { BrandsService } from '../services/brands.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Brands')
@Controller('brands')
export class BrandsController {
  constructor(private brandsService: BrandsService) {}
  @Get()
  getBrands(): Promise<Brand[]> {
    return this.brandsService.findAll();
  }

  @Get('/:id')
  getBrandById(@Param('id') id: string): Promise<Brand> {
    return this.brandsService.findById(id);
  }

  @Post()
  createBrand(@Body() createBrandDto: CreateBrandDto): Promise<Brand> {
    return this.brandsService.createBrand(createBrandDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() payload: UpdateBrandDto,
  ): Promise<Brand> {
    return this.brandsService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<Boolean> {
    return this.brandsService.remove(id);
  }
}
