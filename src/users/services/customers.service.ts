import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';
import { Customer } from '../entities/customer.entity';
import { CustomersRepository } from '../repositories/customers.repository';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(CustomersRepository)
    private customersRepository: CustomersRepository,
  ) {}

  async createCustomer(
    createCustomerDto: CreateCustomerDto,
  ): Promise<Customer> {
    const customer = this.customersRepository.create({ ...createCustomerDto });
    await this.customersRepository.save(customer);
    return customer;
  }

  async findAll(): Promise<Customer[]> {
    return await this.customersRepository.find();
  }

  async findById(id: string): Promise<Customer> {
    const customer = await this.customersRepository.findOne(id);
    if (!customer) throw new NotFoundException();
    return customer;
  }

  async update(id: string, changes: UpdateCustomerDto): Promise<Customer> {
    const customer = await this.findById(id);
    this.customersRepository.merge(customer, changes);
    await this.customersRepository.save(customer);
    return customer;
  }

  async remove(id: string): Promise<Boolean> {
    const { affected } = await this.customersRepository.delete(id);
    if (!affected) throw new NotFoundException(`Customer #${id} not found`);
    return true;
  }
}
