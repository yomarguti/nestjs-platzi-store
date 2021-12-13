import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';
import { CustomersRepository } from '../repositories/customers.repository';
import { UsersRepository } from '../repositories/users.repository';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository) private usersRepository: UsersRepository,
    @InjectRepository(CustomersRepository)
    private customersRepository: CustomersRepository,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create({ ...createUserDto });

    const hashedPassword = await bcrypt.hash(user.password, 10);

    user.password = hashedPassword;

    if (createUserDto.customerId) {
      const customer = await this.customersRepository.findOne(
        createUserDto.customerId,
      );
      user.customer = customer;
    }
    return await this.usersRepository.save(user);
  }

  async findByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email } });
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

  /*   async getOrderByUser(id: string): Promise<Order> {
    const user = await this.findById(id);
    return {
      user,
      products: await this.productsService.findAll(),
    };
  } */
}
