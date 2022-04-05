/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
	@ApiProperty()
	access_token: string;

	@ApiProperty()
	refresh_token: string;

	@ApiProperty()
	scope = '*';

	@ApiProperty()
	expires_in: number;

	@ApiProperty()
	grant_type = 'password';
}