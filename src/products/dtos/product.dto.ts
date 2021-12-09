import { IsNotEmpty, IsNumber, IsString, IsUrl, IsUUID } from 'class-validator';
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
  @IsUUID('all')
  @IsNotEmpty()
  readonly brandId: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
