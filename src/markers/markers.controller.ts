import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MarkersService } from './markers.service';
import { CreateMarkerDto } from './dto/create-marker.dto';
import { UpdateMarkerDto } from './dto/update-marker.dto';
import { RolesGuard } from 'src/security/roles.guard';
import { Roles } from 'src/security/roles.decorator';
import { Role } from 'src/security/roles.enum';

@Controller('markers')
export class MarkersController {
  constructor(private readonly markersService: MarkersService) {}

  @UseGuards(RolesGuard)
  @Roles(Role.Admin,Role.Vip)
  @Post()
  create(@Body() createMarkerDto: CreateMarkerDto) {
    return this.markersService.create(createMarkerDto);
  }

  @Get()
  findAll() {
    return this.markersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.markersService.findOne(+id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin,Role.Vip)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMarkerDto: UpdateMarkerDto) {
    return this.markersService.update(+id, updateMarkerDto);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin,Role.Vip)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.markersService.remove(+id);
  }
}
