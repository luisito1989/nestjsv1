import { Injectable, NotFoundException } from '@nestjs/common';
import { Brand } from '../entities/brand.entity';
import { CreateBrandsDto, UpdateBrandDto } from '../dtos/brands.dtos';

@Injectable()
export class BrandsService {
  brands: Brand[] = [
    {
      id: 1,
      name: 'Nike',
      description: '',
    },
  ];
  brandCount = 1;

  findAll() {
    return this.brands;
  }

  findOne(id: number) {
    const result = this.brands.find((item) => item.id === id);
    if (!result) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return result;
  }

  create(payload: CreateBrandsDto) {
    this.brandCount = this.brandCount + 1;
    const newBrand = {
      id: this.brandCount,
      ...payload,
    };
    this.brands.push(newBrand);
    return newBrand;
  }

  update(id: number, payload: UpdateBrandDto) {
    const index = this.brands.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new NotFoundException(`Brand #${id} not found`);
    }

    const data = this.brands[index];
    const changed = {
      ...data,
      ...payload,
    };
    this.brands[index] = changed;
    return changed;
  }

  drop(id: number) {
    const index = this.brands.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    this.brands.splice(index, 1);
    return { id };
  }
}
