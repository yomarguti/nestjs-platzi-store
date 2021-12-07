import { EntityRepository, Repository } from 'typeorm';
import { Brand } from '../entities/brand.entity';

@EntityRepository(Brand)
export class BrandsRepository extends Repository<Brand> {}
