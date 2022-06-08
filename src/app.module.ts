import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import {AuthModule} from "./auth/auth.module";
import {MarkersModule} from "./markers/markers.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: process.env.HOST,
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
    MarkersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
