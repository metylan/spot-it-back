/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateStyleDto {
	@ApiProperty()
	@IsNotEmpty()
	name!: string;

}
