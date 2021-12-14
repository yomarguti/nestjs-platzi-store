import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { PayloadToken } from '../../auth/models/token.model';
import { ProfileService } from '../services/profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get('my-orders')
  async getOrders(@Req() req: Request) {
    const user = req.user as PayloadToken;
    return this.profileService.getOrdersByCustomer(user.sub);
  }
}
