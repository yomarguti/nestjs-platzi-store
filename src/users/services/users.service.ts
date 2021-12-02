import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsService } from '../../products/services/products.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { Order } from '../entities/order.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private productsService: ProductsService) {}
  private counterId = 1;
  private users: User[] = [
    {
      id: 1,
      email: 'yo@yo.com',
      password: '123456',
      role: 'admin',
    },
  ];

  createUser(createUserDto: CreateUserDto) {
    this.counterId++;
    const user = {
      id: this.counterId,
      ...createUserDto,
    };
    this.users.push(user);
    return user;
  }

  findAll(): User[] {
    return this.users;
  }

  findById(id: number): User {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException();
    return user;
  }

  update(id: number, changes: UpdateUserDto) {
    const user = this.findById(id);
    const index = this.users.findIndex((item) => item.id === id);
    this.users[index] = {
      ...user,
      ...changes,
    };
    return this.users[index];
  }

  remove(id: number) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`User #${id} not found`);
    }
    this.users.splice(index, 1);
    return true;
  }

  getOrderByUser(id: number): Order {
    const user = this.findById(id);
    return {
      date: new Date(),
      user,
      products: this.productsService.findAll(),
    };
  }
}
