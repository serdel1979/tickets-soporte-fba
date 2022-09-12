import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly usersService: SeedService) {}

  

  @Get()
  executeSeed() {
    const userSeed: any = {
      "user":"soporte",
      "password":"soporte",
      "roles":[{"Role":"admin"},{"Role":"user"}]};
    return this.usersService.seed(userSeed);
  }

}
