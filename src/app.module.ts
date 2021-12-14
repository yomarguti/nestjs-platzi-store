import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { environments } from './environments';
import { configValidationSchema } from './config.schema';
import { AuthModule } from './auth/auth.module';
import config from './typed.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      isGlobal: true,
      validationSchema: configValidationSchema,
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const host = configService.get('TYPEORM_HOST');
        if (host !== 'localhost') {
          return {
            type: 'postgres',
            autoLoadEntities: true,
            synchronize: false,
            url: configService.get('DATABASE_URL'),
            ssl: {
              rejectUnauthorized: host !== 'localhost',
            },
          };
        }

        return {
          type: 'postgres',
          autoLoadEntities: true,
          synchronize: false,
          url: configService.get('DATABASE_URL'),
        };
      },
    }),
    UsersModule,
    ProductsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
