import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { PermissionGuard } from '../guards/permission.guard';
import { CronOST } from './ost/cron.ost';
import { CronTOC } from './toc/cron.toc';

@Controller('cronjobs')
@UseGuards(JwtAuthGuard, PermissionGuard)
export class IntegrationController {
  constructor(
    private readonly cronOst: CronOST,
    private readonly cronToc: CronTOC,
  ) {}

  @Get('ost/initiatives')
  async updateAllInititatives() {
    this.cronOst.cronInitiativeRelatedData();
  }

  @Get('ost/workpackages')
  async updateAllWorkpackages() {
    this.cronOst.cronWorkpackageRelatedData();
  }

  @Get('toc/phases')
  async updateAllTOCPhases() {
    this.cronToc.cronTocPhasesData();
  }
}
