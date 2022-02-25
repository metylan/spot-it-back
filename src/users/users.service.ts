import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
	constructor(@InjectRepository(User) private data: Repository<User>) { }


	async create(dto: CreateUserDto) {
		const salt = process.env['HASH_SALT'] || 12; // 12 rotations by default
		const hash = await bcrypt.hash(dto.password, salt);
		return this.data.save({ ...dto, hash });
	}

	findAll(): Promise<User[]> {
		return this.data.find();
	}

	findOne(id: number): Promise<User> {
		return this.data.findOneOrFail(id).catch(() => {
			throw new NotFoundException(id);
		});
	}

	findByMail(mail: string): Promise<User> {
		return this.data.findOne({ mail });
	}

	async update(id: number, dto: UpdateUserDto): Promise<User> {
		const salt = process.env['HASH_SALT'] || 12; // 12 Rotations by default
		const hash = await bcrypt.hash(dto.password, salt);
		const done = await this.data.update(id, { ...dto, hash });
		if (done.affected != 1) throw new NotFoundException(id);
		return this.findOne(id);
	}

	async remove(id: number) {
		const done: DeleteResult = await this.data.delete(id);
		if (done.affected !== 1) throw new NotFoundException(id);
	}
}
