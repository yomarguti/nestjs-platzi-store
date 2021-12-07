import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsService } from '../../products/services/products.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { Order } from '../entities/order.entity';
import { User } from '../entities/user.entity';
import { CustomersRepository } from '../repositories/customers.repository';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository) private usersRepository: UsersRepository,
    @InjectRepository(CustomersRepository)
    private customersRepository: CustomersRepository,
    private productsService: ProductsService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create({ ...createUserDto });
    if (createUserDto.customerId) {
      const customer = await this.customersRepository.findOne(
        createUserDto.customerId,
      );
      user.customer = customer;
    }
    return await this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find({ relations: ['customer'] });
  }

  async findById(id: string): Promise<User> {
    const user = await this.usersRepository.findOne(id);
    if (!user) throw new NotFoundException();
    return user;
  }

  async update(id: string, changes: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);
    this.usersRepository.merge(user, changes);
    await this.usersRepository.save(user);
    return user;
  }

  async remove(id: string): Promise<Boolean> {
    const { affected } = await this.usersRepository.delete(id);
    if (!affected) throw new NotFoundException(`User #${id} not found`);
    return true;
  }

  async getOrderByUser(id: string): Promise<Order> {
    const user = await this.findById(id);
    return {
      date: new Date(),
      user,
      products: await this.productsService.findAll(),
    };
  }
}
