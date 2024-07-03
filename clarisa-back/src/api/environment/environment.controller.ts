import { Controller, Get, Param } from '@nestjs/common';
import { EnvironmentService } from './environment.service';

@Controller('environment')
export class EnvironmentController {
  constructor(private readonly environmentService: EnvironmentService) {}

  @Get()
  findAll() {
    return this.environmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.environmentService.findOne(+id);
  }
}
