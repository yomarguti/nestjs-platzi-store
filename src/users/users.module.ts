import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from '../products/products.module';
import { CustomersController } from './controllers/customers.controller';
import { UsersController } from './controllers/users.controller';
import { CustomersRepository } from './repositories/customers.repository';
import { UsersRepository } from './repositories/users.repository';
import { CustomersService } from './services/customers.service';
import { UsersService } from './services/users.service';

@Module({
  controllers: [UsersController, CustomersController],
  providers: [UsersService, CustomersService],
  imports: [
    TypeOrmModule.forFeature([CustomersRepository, UsersRepository]),
    ProductsModule,
  ],
})
export class UsersModule {}
