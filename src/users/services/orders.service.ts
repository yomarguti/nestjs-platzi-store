import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';
import { Order } from '../entities/order.entity';
import { CustomersRepository } from '../repositories/customers.repository';
import { OrdersRepository } from '../repositories/orders.repository';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrdersRepository)
    private ordersRepository: OrdersRepository,
    @InjectRepository(CustomersRepository)
    private customerRepository: CustomersRepository,
  ) {}

  async createUser(createOrderDto: CreateOrderDto): Promise<Order> {
    const { customerId } = createOrderDto;
    const order = this.ordersRepository.create();
    if (customerId) {
      const customer = await this.customerRepository.findOne(customerId);
      order.customer = customer;
    }
    await this.ordersRepository.save(order);
    return order;
  }

  async findAll(): Promise<Order[]> {
    return await this.ordersRepository.find();
  }

  async findById(id: string): Promise<Order> {
    const order = await this.ordersRepository.findOne(id, {
      relations: ['items', 'items.product'],
    });
    if (!order) throw new NotFoundException();
    return order;
  }

  async update(id: string, changes: UpdateOrderDto): Promise<Order> {
    const { customerId } = changes;

    const order = await this.findById(id);
    if (customerId) {
      const customer = await this.customerRepository.findOne(customerId);
      order.customer = customer;
    }
    await this.ordersRepository.save(order);
    return order;
  }

  async remove(id: string): Promise<Boolean> {
    const { affected } = await this.ordersRepository.delete(id);
    if (!affected) throw new NotFoundException(`Order #${id} not found`);
    return true;
  }
}
