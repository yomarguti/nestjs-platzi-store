import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandsController } from './controllers/brands.controller';
import { CategoriesController } from './controllers/categories.controller';
import { ProductsController } from './controllers/products.controller';
import { BrandsRepository } from './repositories/brands.repository';
import { CategoriesRepository } from './repositories/categories.repository';
import { ProductsRepository } from './repositories/products.repository';
import { BrandsService } from './services/brands.service';
import { CategoriesService } from './services/categories.service';
import { ProductsService } from './services/products.service';
import { ProfileController } from './controllers/profile.controller';
import { ProfileService } from './services/profile.service';
import { OrdersRepository } from '../users/repositories/orders.repository';
import { CustomersRepository } from '../users/repositories/customers.repository';
import { UsersService } from '../users/services/users.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductsRepository,
      BrandsRepository,
      CategoriesRepository,
      OrdersRepository,
      CustomersRepository,
    ]),
    UsersModule,
  ],
  controllers: [
    ProductsController,
    CategoriesController,
    BrandsController,
    ProfileController,
  ],
  providers: [
    ProductsService,
    CategoriesService,
    BrandsService,
    ProfileService,
  ],
  exports: [ProductsService],
})
export class ProductsModule {}
