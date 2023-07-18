import { Module } from '@nestjs/common';
import { PhaseService } from './phase.service';
import { PhaseController } from './phase.controller';
import { PhaseRepository } from './repositories/phase.repository';
import { PhaseMapper } from './mappers/phase.mapper';

@Module({
  controllers: [PhaseController],
  providers: [PhaseService, PhaseRepository, PhaseMapper],
})
export class PhaseModule {}
