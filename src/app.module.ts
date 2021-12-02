import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './controllers/products.controller';
import { CategoriesController } from './controllers/categories.controller';
import { ProductService } from './services/products.service';
import { CategoriesService } from './services/categories.service';
import { BrandsService } from './services/brands.service';
import { UsersService } from './services/users.service';
import { CustomersService } from './services/customers.service';
import { UsersController } from './controllers/users.controller';
import { BrandsController } from './controllers/brands.controller';
import { CustomersController } from './controllers/customers.controller';

@Module({
  imports: [],
  controllers: [
    AppController,
    ProductsController,
    CategoriesController,
    UsersController,
    BrandsController,
    CustomersController,
  ],
  providers: [
    AppService,
    ProductService,
    CategoriesService,
    BrandsService,
    UsersService,
    CustomersService,
  ],
})
export class AppModule {}
