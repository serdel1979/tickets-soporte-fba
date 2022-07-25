import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SolicitudesService } from './solicitudes.service';
import { CreateSolicitudDto } from './dto/create-solicitude.dto';
import { UpdateSolicitudDto } from './dto/update-solicitude.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/common/role/roles.guard';
import { JwtAuthGuard } from 'src/auth/local-auth.guard';
import { Roles } from 'src/common/role/roles.decorator';
import { Role } from 'src/common/role/role.enum';


@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('solicitudes')
@Controller('solicitudes')
export class SolicitudesController {
  constructor(private readonly solicitudesService: SolicitudesService) {}

  @Post()
  create(@Body() createSolicitudDto: CreateSolicitudDto) {
    return this.solicitudesService.create(createSolicitudDto);
  }

  @Get()
  findAll() {
    return this.solicitudesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.solicitudesService.findOne(id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSolicitudDto: UpdateSolicitudDto) {
    return this.solicitudesService.update(id, updateSolicitudDto);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.solicitudesService.remove(id);
  }
}
