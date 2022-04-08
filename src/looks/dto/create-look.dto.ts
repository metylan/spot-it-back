/* eslint-disable indent */
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Style } from 'src/styles/entities/style.entity';
import { Look } from '../entities/look.entity';

export class CreateLookDto {
	@ApiProperty()
	@IsNotEmpty()
	name!: string;

	@ApiProperty()
	styles: Style[];

	@ApiProperty()
	looks: Look[];
}
