/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
	@ApiProperty()
	@IsNotEmpty()
	name!: string;

	@ApiProperty()
	@IsNotEmpty()
	image!: string;
}
