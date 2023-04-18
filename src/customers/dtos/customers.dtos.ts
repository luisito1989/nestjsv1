import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsString()
  @IsNotEmpty()
  readonly idNumber: string;
  @IsString()
  readonly extra: string;
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
