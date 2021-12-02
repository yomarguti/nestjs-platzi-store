import { Body, Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('new/:id')
  getNewHello(@Param('id') id: string): string {
    return `New Hello message! from the id ${id}`;
  }

  @Get('new/')
  getNewHelloQuery(
    @Query('limit') limit: string,
    @Query('offset') offset: string,
  ): string {
    return `New Hello message! with query params. limit ${limit}, offset ${offset}`;
  }
}
