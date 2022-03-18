import { Module } from '@nestjs/common';
import { LooksService } from './looks.service';
import { LooksController } from './looks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Look } from './entities/look.entity';
import { Style } from 'src/styles/entities/style.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Look, Style])],
	controllers: [LooksController],
	providers: [LooksService]
})
export class LooksModule { }
