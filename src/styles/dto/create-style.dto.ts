/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty } from 'class-validator';
import { Category } from 'src/categories/entities/category.entity';

export class CreateStyleDto {
	@ApiProperty()
	@IsNotEmpty()
	name!: string;

	@ApiProperty()
	@IsNotEmpty()
	image!: string;

	@ApiProperty()
	@IsDefined()
	categories: Category[];
}
