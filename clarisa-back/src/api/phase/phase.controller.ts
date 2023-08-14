import { Controller, Get, Param, Query } from '@nestjs/common';
import { PhaseService } from './phase.service';
import { FindAllOptions } from '../../shared/entities/enums/find-all-options';

@Controller()
export class PhaseController {
  constructor(private readonly phaseService: PhaseService) {}

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
}
