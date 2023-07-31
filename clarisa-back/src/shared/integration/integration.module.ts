import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CountryRepository } from '../../api/country/repositories/country.repository';
import { InitiativeStageRepository } from '../../api/initiative/repositories/initiative-status.repository';
import { InitiativeRepository } from '../../api/initiative/repositories/initiative.repository';
import { StageRepository } from '../../api/initiative/repositories/status.repository';
import { RegionRepository } from '../../api/region/repositories/region.repository';
import { WorkpackageCountryRepository } from '../../api/workpackage/repositories/workpackage-country.repository';
import { WorkpackageRegionRepository } from '../../api/workpackage/repositories/workpackage-country.repository copy';
import { WorkpackageRepository } from '../../api/workpackage/repositories/workpackage.repository';
import { IntegrationController } from './integration.controller';
import { ApiOST } from './ost/api.ost';
import { CronOST } from './ost/cron.ost';
import { QaService } from './qa/qa.service';
import { ApiGeoNames } from './ost/api.geonames';
import { PhaseRepository } from '../../api/phase/repositories/phase.repository';
import { ApiTOC } from './toc/api.toc';
import { CronTOC } from './toc/cron.toc';

@Module({
  imports: [HttpModule],
  providers: [
    CronOST,
    ApiOST,
    ApiGeoNames,
    WorkpackageRepository,
    InitiativeRepository,
    CountryRepository,
    RegionRepository,
    QaService,
    HttpModule,
    InitiativeStageRepository,
    StageRepository,
    WorkpackageCountryRepository,
    WorkpackageRegionRepository,
    CronTOC,
    ApiTOC,
    PhaseRepository,
  ],
  controllers: [IntegrationController],
  exports: [QaService],
})
export class IntegrationModule {}
