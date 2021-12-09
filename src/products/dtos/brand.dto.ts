import { IsString, IsUrl, IsNotEmpty } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateBrandDto {
  @ApiProperty({ description: "Brand's name" })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ description: "Brand's image" })
  @IsUrl()
  @IsNotEmpty()
  readonly image: string;
}

export class UpdateBrandDto extends PartialType(CreateBrandDto) {}
