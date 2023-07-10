import { Entity } from 'typeorm';
import { Phase } from './phase.entity';

@Entity('phases_reporting')
export class PhaseReporting extends Phase {}
