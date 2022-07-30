import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SolicitudesService } from './solicitudes.service';
import { CreateSolicitudDto } from './dto/create-solicitude.dto';
import { UpdateSolicitudDto } from './dto/update-solicitude.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/common/role/roles.guard';
import { JwtAuthGuard } from 'src/auth/local-auth.guard';
import { Roles } from 'src/common/role/roles.decorator';
import { Role } from 'src/common/role/role.enum';
import { RoutesGuard } from './routes.guard';


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


  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Get()
  findAllSolicituds() {
    return this.solicitudesService.findAll();
  }


  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Get('defecha')
  findAll() {
    return this.solicitudesService.findSolicitudsToday();
  }

  
  @UseGuards(RoutesGuard)
  @Get(':depto')
  findByUser(@Param('depto') depto: string) {
    return this.solicitudesService.findByUser(depto);
  }



  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Get('sop/:depto')
  findByUserAdmin(@Param('depto') depto: string) {
    return this.solicitudesService.findByUserAdmin(depto);
  }

  
  @UseGuards(RoutesGuard)
  @Get('dehoy/:depto')
  findByUserToday(@Param('depto') depto: string) {
    return this.solicitudesService.findByUserToday(depto);
  }


  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Get('/solicitud/:id')
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
