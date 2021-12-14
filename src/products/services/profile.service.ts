import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrdersRepository } from '../../users/repositories/orders.repository';
import { UsersService } from '../../users/services/users.service';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(OrdersRepository)
    private ordersRepository: OrdersRepository,
    private userService: UsersService,
  ) {}

  async getOrdersByCustomer(userId: string) {
    const user = await this.userService.findById(userId);
    if (!user.customer) {
      throw new NotFoundException('Not orders found');
    }
    return this.ordersRepository.find({ where: { customer: user.customer } });
  }
}
