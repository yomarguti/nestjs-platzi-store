import { Repository, EntityRepository } from 'typeorm';
import { Customer } from '../entities/customer.entity';

@EntityRepository(Customer)
export class CustomersRepository extends Repository<Customer> {}
