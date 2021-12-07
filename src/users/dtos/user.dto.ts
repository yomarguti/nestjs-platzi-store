import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Length,
  IsOptional,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: "User's email" })
  @IsString()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ description: "User's password" })
  @IsString()
  @IsNotEmpty()
  @Length(6)
  readonly password: string;

  @ApiProperty({ description: "User's role" })
  @IsNotEmpty()
  readonly role: string;

  @ApiProperty({ description: 'Customer Id' })
  @IsOptional()
  @IsNotEmpty()
  readonly customerId: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
