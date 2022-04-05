import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { StylesModule } from './styles/styles.module';
import { LooksModule } from './looks/looks.module';
import { ProductsModule } from './products/products.module';
import { join } from 'path';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: '.env'
		}),
		TypeOrmModule.forRoot({
			type: 'mariadb',
			host: process.env.DB_HOST,
			port: Number(process.env.DB_PORT),
			username: process.env.DB_USER,
			password: process.env.DB_PASS,
			database: process.env.DB_NAME,
			autoLoadEntities: true,
			synchronize: true,
			migrationsRun: true,
			migrationsTableName: 'migration_history',
			migrations: [
				join(__dirname, 'migrations/*{.ts,.js}')
			],
		}),
		AuthModule,
		UsersModule,
		CategoriesModule,
		StylesModule,
		LooksModule,
		ProductsModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
