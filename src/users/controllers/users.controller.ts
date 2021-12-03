import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ParseIntPipe } from '../../common/parse-int.pipe.ts.pipe';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { Order } from '../entities/order.entity';
import { User } from '../entities/user.entity';
import { UsersService } from '../services/users.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'List all the users' })
  getUsers(): User[] {
    return this.usersService.findAll();
  }

  @Get('/:id')
  getUserById(@Param('id', ParseIntPipe) id: number): User {
    return this.usersService.findById(id);
  }

  @Get('/:id/orders')
  getOrders(@Param('id', ParseIntPipe) id: number): Order {
    return this.usersService.getOrderByUser(id);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): User {
    return this.usersService.createUser(createUserDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateUserDto) {
    return this.usersService.update(+id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
