import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { TokenController } from './token/token.controller';

@Module({
	controllers: [TokenController],
	providers: [UsersService],
	imports: [
		JwtModule.register({
			secret: process.env.JWT_SECRET || 'banana',
			signOptions: {
				audience: process.env.JWt_AUDIENCE || 'GreenYourLook.com'
			}
		}),
		TypeOrmModule.forFeature([User])]
})
export class AuthModule { }
