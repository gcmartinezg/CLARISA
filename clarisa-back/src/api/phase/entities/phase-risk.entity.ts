import { Entity } from 'typeorm';
import { Phase } from './phase.entity';

@Entity('phases_risk')
export class PhaseRisk extends Phase {}
