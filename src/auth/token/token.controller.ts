import { Controller, Get, UnauthorizedException, Headers, RequestTimeoutException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from './dto/sign-in.dto';
import * as bcrypt from 'bcryptjs';

@Controller('auth')
export class TokenController {

	constructor(
		private readonly users: UsersService,
		private readonly jwts: JwtService,
	) { }

	@ApiOperation({ description: 'Authenticate a User' })
	@ApiOkResponse({ description: 'Logged User' })
	@ApiUnauthorizedResponse({
		description: 'Authentification failed',
		type: SignInDto
	})
	@Get('/')
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

					cr.refresh_token = await this.jwts.sign({
						id: usr.id,
					}, {
						subject: mail,
						expiresIn: 604800
					});

					this.users.setCurrentRefreshToken(cr.refresh_token, usr.id);

					return cr;
				}
			}
		}
		throw new UnauthorizedException('Invalid or missing basic credentials');
	}

	@ApiOperation({ description: 'Refresh Token user' })
	@ApiOkResponse({ description: 'Token Refresh' })
	@ApiUnauthorizedResponse({ description: 'Refresh failed' })
	@Get('/refresh')
	async refreshToken(@Headers('Authorization') auth: string) {
		const args = auth && auth.split(' ');
		if (args && args.length == 2 && args[0] == 'Bearer') {
			const credentials = this.jwts.decode(args[1]);
			const usr = await this.users.findOne(credentials['id']);
			if (usr) {
				if (usr.hashRefreshToken) {
					if (await bcrypt.compare(args[1], usr.hashRefreshToken)) {
						if (Date.now() < credentials['exp'] * 1000) {
							const cr = new SignInDto();
							cr.scope = '*';
							cr.expires_in = 3600;
							cr.access_token = await this.jwts.sign({
								id: usr.id,
								role: usr.role
							}, {
								subject: usr.mail,
								expiresIn: 3600
							});

							return cr;
						} else {
							throw new RequestTimeoutException('Refresh token timeout');
						}
					}
				}
			}
		}
		throw new UnauthorizedException('Invalid or missing refresh token');
	}

	@ApiOperation({ description: 'Logout User' })
	@Get('/logout')
	async lougout(@Headers('Authorization') auth: string) {
		const args = auth && auth.split(' ');
		if (args && args.length == 2 && args[0] == 'Bearer') {
			const credentials = this.jwts.decode(args[1]);
			const usr = await this.users.findOne(credentials['id']);
			if (usr) {
				this.users.setCurrentRefreshToken(null, usr.id);
			}
		}
		throw new UnauthorizedException('Invalid or missing token');

	}
}
