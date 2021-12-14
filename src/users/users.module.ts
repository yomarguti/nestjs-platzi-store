import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from '../products/products.module';
import { CustomersController } from './controllers/customers.controller';
import { UsersController } from './controllers/users.controller';
import { CustomersRepository } from './repositories/customers.repository';
import { UsersRepository } from './repositories/users.repository';
import { CustomersService } from './services/customers.service';
import { UsersService } from './services/users.service';
import { OrdersService } from './services/orders.service';
import { OrdersController } from './controllers/orders.controller';
import { OrdersRepository } from './repositories/orders.repository';
import { OrderItemController } from './controllers/order-item.controller';
import { OrderItemService } from './services/order-item.service';
import { OrderItemRepository } from './repositories/order-item.repository';
import { Product } from '../products/entities/product.entity';

@Module({
  controllers: [
    UsersController,
    CustomersController,
    OrdersController,
    OrderItemController,
  ],
  providers: [UsersService, CustomersService, OrdersService, OrderItemService],
  imports: [
    TypeOrmModule.forFeature([
      CustomersRepository,
      UsersRepository,
      OrdersRepository,
      OrderItemRepository,
      Product,
    ]),
  ],

  exports: [UsersService],
})
export class UsersModule {}
