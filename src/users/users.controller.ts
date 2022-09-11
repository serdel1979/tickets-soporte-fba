import { Controller, Get, Post, Body, Patch, Param, Request, Delete, UseGuards, ExecutionContext, HttpException, SetMetadata } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/local-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles, ROLES_KEY } from 'src/common/role/roles.decorator';
import { Role } from 'src/common/role/role.enum';
import { RolesGuard } from '../common/role/roles.guard';



@ApiBearerAuth()
@UseGuards(JwtAuthGuard,RolesGuard)
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  
  @Roles(Role.Admin)
  @Post()
  create(@Body() createUserDto: UserDto) {
    return this.usersService.create(createUserDto);
  }

  
  @Roles(Role.Admin)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Roles(Role.Admin)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }


  @Roles(Role.Admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }


  @Roles(Role.Admin)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const usr = await this.usersService.findOne(id);
    if (usr){

      for(let rol of usr.roles){
          const keys = Object.keys;
          for(const r of keys(rol)){
            const roleAsKey = r as keyof typeof rol;
            if (rol[roleAsKey]=='admin'){
              throw new HttpException("No se puede eliminar a un admin",403);
            }
          }
      } 
    }
    return this.usersService.remove(id);
  }

}