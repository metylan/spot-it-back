import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsListsService } from './products-lists.service';
import { CreateProductsListDto } from './dto/create-products-list.dto';
import { UpdateProductsListDto } from './dto/update-products-list.dto';

@Controller('products-lists')
export class ProductsListsController {
	constructor(private readonly productsListsService: ProductsListsService) { }

	@Post()
	create(@Body() createProductsListDto: CreateProductsListDto) {
		return this.productsListsService.create(createProductsListDto);
	}

	@Get()
	findAll() {
		return this.productsListsService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.productsListsService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateProductsListDto: UpdateProductsListDto) {
		return this.productsListsService.update(+id, updateProductsListDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.productsListsService.remove(+id);
	}
}
