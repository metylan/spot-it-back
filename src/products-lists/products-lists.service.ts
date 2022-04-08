import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateProductsListDto } from './dto/create-products-list.dto';
import { UpdateProductsListDto } from './dto/update-products-list.dto';
import { ProductsList } from './entities/products-list.entity';

@Injectable()
export class ProductsListsService {
	constructor(@InjectRepository(ProductsList) private data: Repository<ProductsList>) { }

	create(dto: CreateProductsListDto) {
		return this.data.save(dto);
	}

	findAll(): Promise<ProductsList[]> {
		return this.data.find({ relations: ['products', 'user'] });
	}

	findOne(id: number): Promise<ProductsList> {
		return this.data.findOne(id, { relations: ['products', 'user'] });
	}

	async update(id: number, dto: UpdateProductsListDto): Promise<ProductsList> {
		const done = await this.data.update(id, dto);
		if (done.affected !== 1) throw new NotFoundException(id);
		return this.findOne(id);
	}

	async remove(id: number) {
		const done: DeleteResult = await this.data.delete(id);
		if (done.affected !== 1) throw new NotFoundException(id);
	}
}
