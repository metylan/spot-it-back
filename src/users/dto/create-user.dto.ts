/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Roles } from 'src/security/role.enum';

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

	@ApiProperty({ enum: Roles })
	role!: Roles;
}
