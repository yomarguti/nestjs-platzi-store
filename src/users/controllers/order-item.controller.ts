import { Body, Controller, Post } from '@nestjs/common';
import { CreateOrderItemDto } from '../dtos/order-item.dto';
import { OrderItem } from '../entities/order-item.entity';
import { OrderItemService } from '../services/order-item.service';

@Controller('order-item')
export class OrderItemController {
  constructor(private orderItemService: OrderItemService) {}

  @Post()
  createUser(
    @Body() createOrderItemDto: CreateOrderItemDto,
  ): Promise<OrderItem> {
    return this.orderItemService.createOrderItem(createOrderItemDto);
  }
}
