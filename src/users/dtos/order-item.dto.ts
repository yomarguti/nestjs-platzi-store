import { IsInt, IsNotEmpty, IsUUID } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateOrderItemDto {
  @ApiProperty({ description: 'Customer Id' })
  @IsUUID('all')
  @IsNotEmpty()
  readonly orderId: string;

  @ApiProperty({ description: 'Product Id' })
  @IsUUID('all')
  readonly productId: string;

  @ApiProperty({ description: 'Quantity' })
  @IsNotEmpty()
  @IsInt()
  readonly quantity: number;
}

export class UpdateOrderItemDto extends PartialType(CreateOrderItemDto) {}
