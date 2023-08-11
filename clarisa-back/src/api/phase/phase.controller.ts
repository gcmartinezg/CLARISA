import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PhaseService } from './phase.service';
import { CreatePhaseDto } from './dto/create-phase.dto';
import { UpdatePhaseDto } from './dto/update-phase.dto';
import { FindAllOptions } from '../../shared/entities/enums/find-all-options';

@Controller()
export class PhaseController {
  constructor(private readonly phaseService: PhaseService) {}

  @Post()
  create(@Body() createPhaseDto: CreatePhaseDto) {
    return this.phaseService.create(createPhaseDto);
  }

  @Get()
  findAll(
    @Query('show') show: FindAllOptions,
    @Query('status') status: string,
  ) {
    return this.phaseService.findAll(show, status);
  }

  @Get('/by-application/:app')
  findAllByApplication(
    @Param('app') application: string,
    @Query('show') show: FindAllOptions,
    @Query('status') status: string,
  ) {
    return this.phaseService.findAllByApplication(application, show, status);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.phaseService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePhaseDto: UpdatePhaseDto) {
    return this.phaseService.update(+id, updatePhaseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.phaseService.remove(+id);
  }
}
