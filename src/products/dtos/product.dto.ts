import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  IsUUID,
  Min,
  Validate,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ description: "Product's name" })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ description: "Product's description" })
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty({ description: "Product's price" })
  @IsNumber()
  @IsNotEmpty()
  readonly price: number;

  @ApiProperty({ description: "Product's stock" })
  @IsNumber()
  @IsNotEmpty()
  readonly stock: number;

  @ApiProperty({ description: "Product's image" })
  @IsUrl()
  @IsNotEmpty()
  readonly image: string;

  @ApiProperty({ description: "Product's brand" })
  @IsUUID('all', { each: true })
  @IsNotEmpty()
  readonly brandId: string;

  @ApiProperty({ description: "Product's categories" })
  @IsUUID('all', { each: true })
  @IsNotEmpty()
  @IsArray()
  readonly categoriesId: string[];
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class FilterProductsDto {
  @IsOptional()
  @IsPositive()
  @IsInt()
  limit: number;

  @IsOptional()
  @Min(0)
  @IsInt()
  offset: number;

  @IsOptional()
  @Min(0)
  minPrice: number;

  @IsPositive()
  @Validate((item) => item.minPrice)
  maxPrice: number;
}
/* export class RemoveCategoryFromProductDto {
  @ApiProperty({ description: 'Product Id' })
  @IsNotEmpty()
  @IsUUID('all')
  productId: string;

  @ApiProperty({ description: 'Category Id' })
  @IsNotEmpty()
  @IsUUID('all')
  categoryId: string;
}
 */
