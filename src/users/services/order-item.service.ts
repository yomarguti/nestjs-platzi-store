import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { CreateOrderItemDto } from '../dtos/order-item.dto';
import { OrderItem } from '../entities/order-item.entity';
import { OrderItemRepository } from '../repositories/order-item.repository';
import { OrdersRepository } from '../repositories/orders.repository';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItemRepository)
    private orderItemRepository: OrderItemRepository,
    @InjectRepository(OrdersRepository)
    private orderRepository: OrdersRepository,
    @InjectRepository(Product) private productsRepository: Repository<Product>,
  ) {}

  async createOrderItem(
    createOrderItemDto: CreateOrderItemDto,
  ): Promise<OrderItem> {
    const { orderId, productId, quantity } = createOrderItemDto;
    const order = await this.orderRepository.findOne(orderId);
    const product = await this.productsRepository.findOne(productId);
    const item = this.orderItemRepository.create({ order, product, quantity });
    await this.orderItemRepository.save(item);
    return item;
  }
}
