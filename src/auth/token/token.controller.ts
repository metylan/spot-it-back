import { Controller, Get, UnauthorizedException, Headers } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from './dto/sign-in.dto';
import * as bcrypt from 'bcryptjs';

@Controller('auth')
export class TokenController {

	constructor(
		private users: UsersService,
		private jwts: JwtService
	) { }

	@ApiOperation({ description: 'Authenticate a User' })
	@ApiOkResponse({ description: 'Logged User' })
	@ApiUnauthorizedResponse({
		description: 'Authentification failed',
		type: SignInDto
	})
	@Get()
	async signIn(@Headers('Authorization') auth: string) {
		const args = auth && auth.split(' ');
		if (args && args.length == 2 && args[0] == 'Basic') {
			const credentials = Buffer.from(args[1], 'base64').toString('utf-8').split(':');
			const mail = credentials[0];
			const pass = credentials[1];
			const usr = await this.users.findByMail(mail);
			if (usr) {
				if (await bcrypt.compare(pass, usr.hash)) {
					const cr = new SignInDto();
					cr.scope = '*';
					cr.expires_in = 3600;
					cr.access_token = await this.jwts.sign({
						id: usr.id,
						role: usr.role
					}, {
						subject: mail,
						expiresIn: 3600
					});
					return cr;
				}
			}
		}
		throw new UnauthorizedException('Invalid or missing basic credentials');
	}
}
