import { Entity } from 'typeorm';
import { Phase } from './phase.entity';

@Entity('phases_toc')
export class PhaseToc extends Phase {}
