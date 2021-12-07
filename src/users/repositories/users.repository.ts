import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityRepository } from 'typeorm';
import { CreateUserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';
import { CustomersRepository } from './customers.repository';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {}
