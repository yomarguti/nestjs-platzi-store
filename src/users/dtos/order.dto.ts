import { IsNotEmpty, IsUUID } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({ description: 'Customer Id' })
  @IsUUID('all')
  @IsNotEmpty()
  readonly customerId: string;
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
