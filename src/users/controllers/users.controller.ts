import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dtos';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersServices: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'List of products' })
  getUsers() {
    return this.usersServices.findAll();
  }

  @Get('/:id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersServices.findOne(id);
  }

  @Get('/:id/orders')
  getOrder(@Param('id', ParseIntPipe) id: number) {
    return this.usersServices.getOrderByUser(id);
  }

  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.usersServices.create(payload);
  }

  @Put('/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserDto,
  ) {
    return this.usersServices.update(id, payload);
  }

  @Delete('/:id')
  drop(@Param('id', ParseIntPipe) id: number) {
    return this.usersServices.drop(id);
  }
}
