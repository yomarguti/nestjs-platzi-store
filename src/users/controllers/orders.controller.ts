import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';
import { Order } from '../entities/order.entity';
import { OrdersService } from '../services/orders.service';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @Get()
  @ApiOperation({ summary: 'List all the orders' })
  getUsers(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  @Get('/:id')
  getOrderById(@Param('id') id: string): Promise<Order> {
    return this.orderService.findById(id);
  }

  /*   @Get('/:id/orders')
  async getOrders(@Param('id') id: string): Promise<Order> {
    return this.orderService.getOrderByUser(id);
  } */

  @Post()
  createUser(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderService.createUser(createOrderDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() payload: UpdateOrderDto,
  ): Promise<Order> {
    return this.orderService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<Boolean> {
    return this.orderService.remove(id);
  }
}
