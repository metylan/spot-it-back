import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateLookDto } from './dto/create-look.dto';
import { UpdateLookDto } from './dto/update-look.dto';
import { Look } from './entities/look.entity';

@Injectable()
export class LooksService {
	constructor(@InjectRepository(Look) private data: Repository<Look>) { }
	create(dto: CreateLookDto): Promise<Look> {
		return this.data.save(dto);
	}

	findAll(): Promise<Look[]> {
		return this.data.find();
	}

	findOne(id: number): Promise<Look> {
		return this.data.findOneOrFail(id);
	}

	async update(id: number, updateLookDto: UpdateLookDto): Promise<Look> {
		const done = await this.data.update(id, updateLookDto);
		if (done.affected !== 1) throw new NotFoundException(id);
		return this.findOne(id);
	}

	async remove(id: number) {
		const done: DeleteResult = await this.data.delete(id);
		if (done.affected !== 1) throw new NotFoundException(id);
	}
}
