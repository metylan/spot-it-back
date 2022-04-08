/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
	@ApiProperty()
	@IsNotEmpty()
	name!: string;

	@ApiProperty()
	@IsNotEmpty()
	image!: string;

	@ApiProperty()
	@IsNotEmpty()
	price!: number;

	@ApiProperty()
	@IsNotEmpty()
	stock!: number;

	@ApiProperty()
	description: string;
}
