import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AppSecretService } from './app-secret.service';
import { CreateAppSecretDto } from './dto/create-app-secret.dto';
import { UpdateAppSecretDto } from './dto/update-app-secret.dto';

@Controller('app-secret')
export class AppSecretController {
  constructor(private readonly appSecretService: AppSecretService) {}

  @Post()
  create(@Body() createAppSecretDto: CreateAppSecretDto) {
    return this.appSecretService.create(createAppSecretDto);
  }

  @Get()
  findAll() {
    return this.appSecretService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appSecretService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAppSecretDto: UpdateAppSecretDto) {
    return this.appSecretService.update(+id, updateAppSecretDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appSecretService.remove(+id);
  }
}
