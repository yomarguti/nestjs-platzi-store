import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    let isMatch: boolean;

    if (user) {
      isMatch = await bcrypt.compare(password, user.password);
    }

    if (user && isMatch) {
      return user;
    }
    return null;
  }
}
