import { Module } from '@nestjs/common';
import { ProductsListsService } from './products-lists.service';
import { ProductsListsController } from './products-lists.controller';
import { ProductsList } from './entities/products-list.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [TypeOrmModule.forFeature([ProductsList])],
	controllers: [ProductsListsController],
	providers: [ProductsListsService]
})
export class ProductsListsModule { }
