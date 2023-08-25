import { Module } from '@nestjs/common';
import { InitiativeService } from './initiative.service';
import { InitiativeController } from './initiative.controller';
import { InitiativeRepository } from './repositories/initiative.repository';
import { InitiativeStageRepository } from './repositories/initiative-stage.repository';
import { StageRepository } from './repositories/status.repository';

@Module({
  controllers: [InitiativeController],
  providers: [
    InitiativeService,
    InitiativeRepository,
    InitiativeStageRepository,
    StageRepository,
  ],
  exports: [InitiativeStageRepository, StageRepository],
})
export class InitiativeModule {}
