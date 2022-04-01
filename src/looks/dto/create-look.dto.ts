/* eslint-disable indent */
import { IsDefined, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Style } from 'src/styles/entities/style.entity';

export class CreateLookDto {
	@ApiProperty()
	@IsNotEmpty()
	name!: string;

	@ApiProperty()
	@IsDefined()
	style!: Style;
}
