import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { StylesService } from './styles.service';
import { CreateStyleDto } from './dto/create-style.dto';
import { UpdateStyleDto } from './dto/update-style.dto';
import { RolesGuard } from 'src/security/roles.guard';
import { Roles } from 'src/security/roles.decorator';
import { Role } from 'src/security/roles.enum';

@Controller('styles')
export class StylesController {
	constructor(private readonly stylesService: StylesService) { }

	@UseGuards(RolesGuard)
	@Roles(Role.Admin)
	@Post()
	create(@Body() createStyleDto: CreateStyleDto) {
		return this.stylesService.create(createStyleDto);
	}

	@Get()
	findAll() {
		return this.stylesService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.stylesService.findOne(+id);
	}


	@UseGuards(RolesGuard)
	@Roles(Role.Admin)
	@Patch(':id')
	update(@Param('id') id: string, @Body() updateStyleDto: UpdateStyleDto) {
		return this.stylesService.update(+id, updateStyleDto);
	}


	@UseGuards(RolesGuard)
	@Roles(Role.Admin)
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.stylesService.remove(+id);
	}
}
