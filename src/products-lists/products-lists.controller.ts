import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProductsListsService } from './products-lists.service';
import { CreateProductsListDto } from './dto/create-products-list.dto';
import { UpdateProductsListDto } from './dto/update-products-list.dto';
import { RolesGuard } from 'src/security/roles.guard';
import { Roles } from 'src/security/roles.decorator';
import { Role } from 'src/security/roles.enum';

@Controller('products-lists')
export class ProductsListsController {
	constructor(private readonly productsListsService: ProductsListsService) { }

	@UseGuards(RolesGuard)
	@Roles(Role.Admin)
	@Post()
	create(@Body() createProductsListDto: CreateProductsListDto) {
		return this.productsListsService.create(createProductsListDto);
	}

	@UseGuards(RolesGuard)
	@Roles(Role.Admin)
	@Get()
	findAll() {
		return this.productsListsService.findAll();
	}

	@UseGuards(RolesGuard)
	@Roles(Role.Admin)
	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.productsListsService.findOne(+id);
	}

	@UseGuards(RolesGuard)
	@Roles(Role.Admin)
	@Patch(':id')
	update(@Param('id') id: string, @Body() updateProductsListDto: UpdateProductsListDto) {
		return this.productsListsService.update(+id, updateProductsListDto);
	}

	@UseGuards(RolesGuard)
	@Roles(Role.Admin)
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.productsListsService.remove(+id);
	}
}
