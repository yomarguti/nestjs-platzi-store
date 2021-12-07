import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';
import { Customer } from '../entities/customer.entity';
import { CustomersService } from '../services/customers.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Customers')
@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}
  @Get()
  getCustomers(): Promise<Customer[]> {
    return this.customersService.findAll();
  }

  @Get('/:id')
  getCustomerById(@Param('id') id: string): Promise<Customer> {
    return this.customersService.findById(id);
  }

  @Post()
  createCustomer(
    @Body() createCustomerDto: CreateCustomerDto,
  ): Promise<Customer> {
    return this.customersService.createCustomer(createCustomerDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() payload: UpdateCustomerDto,
  ): Promise<Customer> {
    return this.customersService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<Boolean> {
    return this.customersService.remove(id);
  }
}
