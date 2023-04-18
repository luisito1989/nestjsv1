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
import { CustomersService } from '../services/customers.service';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customers.dtos';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Customers')
@Controller('customers')
export class CustomersController {
  constructor(private customersServices: CustomersService) {}

  @Get()
  getCustomers() {
    return this.customersServices.findAll();
  }

  @Get('/:id')
  getCustomer(@Param('id', ParseIntPipe) id: number) {
    return this.customersServices.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateCustomerDto) {
    return this.customersServices.create(payload);
  }

  @Put('/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCustomerDto,
  ) {
    return this.customersServices.update(id, payload);
  }

  @Delete('/:id')
  drop(@Param('id', ParseIntPipe) id: number) {
    return this.customersServices.drop(id);
  }
}
