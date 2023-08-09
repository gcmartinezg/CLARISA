import { Entity } from 'typeorm';
import { Phase } from './phase.entity';

@Entity('phases_ipsr')
export class PhaseIpsr extends Phase {}
