import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
	constructor(@InjectRepository(Category) private data: Repository<Category>) { }

	create(dto: CreateCategoryDto): Promise<Category> {
		return this.data.save(dto);
	}

	findAll(): Promise<Category[]> {
		return this.data.find({relations: ['styles']});
	}

	findOne(id: number): Promise<Category> {
		return this.data.findOneOrFail(id, {relations: ['styles']}).catch(() => {
			throw new NotFoundException(id);
		});
	}

	async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
		const done = await this.data.update(id, updateCategoryDto);
		if (done.affected !== 1) throw new NotFoundException(id);
		return this.findOne(id);
	}

	async remove(id: number) {
		const done: DeleteResult = await this.data.delete(id);
		if (done.affected !== 1) throw new NotFoundException(id);
	}
}
