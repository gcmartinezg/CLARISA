import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InitiativeStage } from '../entities/initiative-stage.entity';

@Injectable()
export class InitiativeStageRepository extends Repository<InitiativeStage> {
  constructor(private dataSource: DataSource) {
    super(InitiativeStage, dataSource.createEntityManager());
  }
}
