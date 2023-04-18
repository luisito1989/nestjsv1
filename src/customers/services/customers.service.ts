import { Injectable, NotFoundException } from '@nestjs/common';
import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customers.dtos';

@Injectable()
export class CustomersService {
  customerCount = 1;
  customers: Customer[] = [
    {
      id: 1,
      name: 'Luis',
      idNumber: '18837628',
      extra: '',
    },
  ];

  findAll() {
    return this.customers;
  }

  findOne(id: number) {
    const result = this.customers.find((item) => item.id === id);
    if (result) {
      throw new NotFoundException(`Custromer #${id} not found`);
    }
  }

  create(payload: CreateCustomerDto) {
    this.customerCount = this.customerCount + 1;
    const newCustomer = {
      id: this.customerCount,
      ...payload,
    };
    this.customers.push(newCustomer);
    return newCustomer;
  }

  update(id: number, payload: UpdateCustomerDto) {
    const index = this.customers.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Custromer #${id} not found`);
    }

    const data = this.customers[index];
    const changed = {
      ...data,
      ...payload,
    };
    this.customers[index] = changed;
    return changed;
  }

  drop(id: number) {
    const index = this.customers.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Custromer #${id} not found`);
    }

    this.customers.splice(index, 1);

    return { id };
  }
}
