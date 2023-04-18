import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dtos';
import { ProductsService } from './../../products/services/products.service';

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    private configService: ConfigService,
  ) {}

  usersCount = 1;
  users: User[] = [
    {
      id: 1,
      username: 'luisitoRey',
      email: 'elperron@gmail.com',
    },
  ];

  findAll() {
    const apiKey = this.configService.get('API_KEY');
    console.log(apiKey);
    return this.users;
  }

  findOne(id: number) {
    const result = this.users.find((item) => item.id === id);
    if (!result) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return result;
  }

  create(payload: CreateUserDto) {
    this.usersCount = this.usersCount + 1;
    const newUser = {
      id: this.usersCount,
      ...payload,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, payload: UpdateUserDto) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`User #${id} not found`);
    }

    const data = this.users[index];
    const changed = {
      ...data,
      ...payload,
    };
    this.users[index] = changed;
    return changed;
  }

  drop(id: number) {
    const index = this.users.findIndex((item) => item.id);
    if (index === -1) {
      throw new NotFoundException(`User #${id} not found`);
    }

    this.users.splice(index, 1);
    return { id };
  }

  getOrderByUser(id: number) {
    const user = this.findOne(id);
    return {
      date: new Date(),
      user,
      products: this.productsService.findAll(),
    };
  }
}
