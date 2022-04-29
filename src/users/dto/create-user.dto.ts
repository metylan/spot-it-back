/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Role } from 'src/security/roles.enum';

export class CreateUserDto {
	@ApiProperty()
	@IsEmail()
	mail!: string;

	@ApiProperty()
	@IsNotEmpty()
	name!: string;

	@ApiProperty()
	@IsNotEmpty()
	password!: string;

	@ApiProperty({ enum: Role })
	role!: Role;

	@ApiProperty()
	limit?: number;
}
