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
import { BrandsService } from '../services/brands.service';
import { CreateBrandsDto, UpdateBrandDto } from '../dtos/brands.dtos';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Brands')
@Controller('brands')
export class BrandsController {
  constructor(private brandsService: BrandsService) {}

  @Get()
  getBrands() {
    return this.brandsService.findAll();
  }

  @Get('/:id')
  getBrand(@Param('id', ParseIntPipe) id: number) {
    return this.brandsService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateBrandsDto) {
    return this.brandsService.create(payload);
  }

  @Put('/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateBrandDto,
  ) {
    const result = this.brandsService.update(id, payload);
    return result;
  }

  @Delete('/:id')
  drop(@Param('id', ParseIntPipe) id: number) {
    const result = this.brandsService.drop(id);
    return result;
  }
}
