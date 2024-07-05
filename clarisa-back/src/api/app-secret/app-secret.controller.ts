import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { AppSecretService } from './app-secret.service';
import { CreateAppSecretDto } from './dto/create-app-secret.dto';
import { FindAllOptions } from '../../shared/entities/enums/find-all-options';

@Controller('')
export class AppSecretController {
  constructor(private readonly appSecretService: AppSecretService) {}

  @Post()
  create(@Body() createAppSecretDto: CreateAppSecretDto) {
    return this.appSecretService.create(createAppSecretDto);
  }

  @Get()
  findAll(@Query('show') show: FindAllOptions) {
    return this.appSecretService.findAll(show);
  }

  @Get('get/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.appSecretService.findOne(+id);
  }
}
