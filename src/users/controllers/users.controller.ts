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
import { User } from '../entities/user.entity';
import { UsersService } from '../services/users.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'List all the users' })
  getUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('/:id')
  getUserById(@Param('id') id: string): Promise<User> {
    return this.usersService.findById(id);
  }

  /*   @Get('/:id/orders')
  async getOrders(@Param('id') id: string): Promise<Order> {
    return this.usersService.getOrderByUser(id);
  } */

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() payload: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<Boolean> {
    return this.usersService.remove(id);
  }
}
