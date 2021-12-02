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

@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}
  @Get()
  getCustomers(): Customer[] {
    return this.customersService.findAll();
  }

  @Get('/:id')
  getCustomerById(@Param('id', ParseIntPipe) id: number): Customer {
    return this.customersService.findById(id);
  }

  @Post()
  createCustomer(@Body() createCustomerDto: CreateCustomerDto): Customer {
    return this.customersService.createCustomer(createCustomerDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateCustomerDto) {
    return this.customersService.update(+id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.customersService.remove(+id);
  }
}
