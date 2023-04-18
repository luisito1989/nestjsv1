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
import { CategoriesService } from '../services/categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/categories.dtos';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  categoriesIndex = 1;
  categories = [
    {
      id: 1,
      name: 'Shoes',
    },
  ];

  constructor(private categoriesServices: CategoriesService) {}

  @Get()
  getAll() {
    return this.categoriesServices.findAll();
  }

  // @Get('/:id/products/:productId')
  // getCategory(@Param('ProductId') productId: string, @Param('id') id: string) {
  //   return `product ${productId} and ${id}`;
  // }

  @Post()
  create(@Body() payload: CreateCategoryDto) {
    return this.categoriesServices.create(payload);
  }

  @Put('/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCategoryDto,
  ) {
    const result = this.categoriesServices.update(id, payload);
    return result;
  }

  @Delete('/:id')
  drop(@Param('id', ParseIntPipe) id: number) {
    const result = this.categoriesServices.drop(id);
    return result;
  }
}
