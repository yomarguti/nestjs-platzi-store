import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';
import { Customer } from '../entities/customer.entity';

@Injectable()
export class CustomersService {
  private counterId = 1;
  private customers: Customer[] = [
    {
      id: 1,
      name: 'Yomar',
      lastName: 'Daza',
      phone: '3173675058',
    },
  ];

  createCustomer(createCustomerDto: CreateCustomerDto) {
    this.counterId++;
    const customer = {
      id: this.counterId,
      ...createCustomerDto,
    };
    this.customers.push(customer);
    return customer;
  }

  findAll(): Customer[] {
    return this.customers;
  }

  findById(id: number): Customer {
    const customer = this.customers.find((customer) => customer.id === id);
    if (!customer) throw new NotFoundException();
    return customer;
  }

  update(id: number, changes: UpdateCustomerDto) {
    const customer = this.findById(id);
    const index = this.customers.findIndex((item) => item.id === id);
    this.customers[index] = {
      ...customer,
      ...changes,
    };
    return this.customers[index];
  }

  remove(id: number) {
    const index = this.customers.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    this.customers.splice(index, 1);
    return true;
  }
}
