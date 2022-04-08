import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
	constructor(@InjectRepository(Product) private data: Repository<Product>) { }

	create(dto: CreateProductDto) {
		return this.data.save(dto);
	}

	findAll(): Promise<Product[]> {
		return this.data.find();
	}

	findOne(id: number): Promise<Product> {
		return this.data.findOne(id);
	}

	async update(id: number, dto: UpdateProductDto): Promise<Product> {
		const done = await this.data.update(id, dto);
		if (done.affected !== 1) throw new NotFoundException(id);
		return this.findOne(id);
	}

	async remove(id: number) {
		const done: DeleteResult = await this.data.delete(id);
		if (done.affected !== 1) throw new NotFoundException(id);
	}
}
