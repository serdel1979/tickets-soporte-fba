import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ExecutionContext } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/local-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/common/role/roles.decorator';
import { Role } from 'src/common/role/role.enum';
import { RolesGuard } from '../common/role/roles.guard';



@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createUserDto: UserDto) {
    console.log(createUserDto);
    return this.usersService.create(createUserDto);
  }

  
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UserDto) {
    return this.usersService.update(id, updateUserDto);
  }


  
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
