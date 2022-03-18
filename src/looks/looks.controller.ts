import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { LooksService } from './looks.service';
import { CreateLookDto } from './dto/create-look.dto';
import { UpdateLookDto } from './dto/update-look.dto';
import { Roles } from 'src/security/roles.decorator';
import { Role } from 'src/security/roles.enum';
import { RolesGuard } from 'src/security/roles.guard';

@Controller('looks')
export class LooksController {
	constructor(private readonly looksService: LooksService) { }

	@UseGuards(RolesGuard)
	@Roles(Role.Admin)
	@Post()
	create(@Body() createLookDto: CreateLookDto) {
		return this.looksService.create(createLookDto);
	}

	@Get()
	findAll() {
		return this.looksService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.looksService.findOne(+id);
	}


	@UseGuards(RolesGuard)
	@Roles(Role.Admin)
	@Patch(':id')
	update(@Param('id') id: string, @Body() updateLookDto: UpdateLookDto) {
		return this.looksService.update(+id, updateLookDto);
	}


	@UseGuards(RolesGuard)
	@Roles(Role.Admin)
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.looksService.remove(+id);
	}
}
