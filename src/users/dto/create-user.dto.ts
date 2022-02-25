import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

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
}
