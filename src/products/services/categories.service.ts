import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from '../entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/categories.dtos';

@Injectable()
export class CategoriesService {
  categoriesIndex = 1;
  categories: Category[] = [
    {
      id: 1,
      name: 'Shoes',
      description: '',
    },
  ];

  findAll() {
    return this.categories;
  }

  findOne(id: number) {
    const result = this.categories.find((item) => item.id === id);
    if (!result) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return result;
  }

  create(payload: CreateCategoryDto) {
    this.categoriesIndex = this.categoriesIndex + 1;
    const newCategory = {
      id: this.categoriesIndex,
      ...payload,
    };
    this.categories.push(newCategory);
    return newCategory;
  }

  update(id: number, payload: UpdateCategoryDto) {
    const index = this.categories.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Category #${id} not found`);
    }

    const data = this.categories[index];
    const changed = {
      ...data,
      ...payload,
    };
    this.categories[index] = changed;
    return changed;
  }

  drop(id: number) {
    const index = this.categories.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Category #${id} not found`);
    }

    this.categories.splice(index, 1);
    return { id };
  }
}
