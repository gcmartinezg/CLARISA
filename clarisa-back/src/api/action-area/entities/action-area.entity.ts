import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AuditableEntity } from '../../../shared/entities/extends/auditable-entity.entity';
import { ActionAreaOutcomeIndicator } from '../../action-area-outcome-indicator/entities/action-area-outcome-indicator.entity';
import { InitiativeStage } from '../../initiative/entities/initiative-stage.entity';

@Entity('action_areas')
export class ActionArea {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Exclude()
  @Column({ type: 'varchar', length: 20, nullable: true })
  smo_code: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  //relation objects

  @OneToMany(
    () => ActionAreaOutcomeIndicator,
    (aaoi) => aaoi.action_area_outcome_object,
  )
  action_area_outcome_indicators: ActionAreaOutcomeIndicator[];

  @OneToMany(() => InitiativeStage, (is) => is.action_area_object)
  initiative_stage_array: InitiativeStage[];

  //auditable fields

  @Exclude()
  @Column(() => AuditableEntity, { prefix: '' })
  auditableFields: AuditableEntity;
}
