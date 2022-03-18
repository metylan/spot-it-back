import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { Roles } from 'src/security/roles.decorator';
import { Role } from 'src/security/roles.enum';
import { RolesGuard } from 'src/security/roles.guard';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
	constructor(private readonly categoriesService: CategoriesService) { }

	@UseGuards(RolesGuard)
	@Roles(Role.Admin)
	@Post()
	create(@Body() createCategoryDto: CreateCategoryDto) {
		return this.categoriesService.create(createCategoryDto);
	}

	@Get()
	findAll() {
		return this.categoriesService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.categoriesService.findOne(+id);
	}

	@UseGuards(RolesGuard)
	@Roles(Role.Admin)
	@Patch(':id')
	update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
		return this.categoriesService.update(+id, updateCategoryDto);
	}

	@UseGuards(RolesGuard)
	@Roles(Role.Admin)
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.categoriesService.remove(+id);
	}
}
