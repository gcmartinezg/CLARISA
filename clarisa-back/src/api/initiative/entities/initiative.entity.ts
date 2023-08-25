import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { AuditableEntity } from '../../../shared/entities/extends/auditable-entity.entity';
import { InitiativeStage } from './initiative-stage.entity';

@Entity('submission_tool_initiatives')
export class Initiative {
  @PrimaryColumn({ type: 'bigint', nullable: false })
  id: number;

  @Column({ type: 'text', nullable: true })
  name: string;

  @Column({ type: 'text', nullable: false })
  short_name: string;

  @Column({ type: 'text', nullable: false })
  official_code: string;

  //object relations

  @OneToMany(() => InitiativeStage, (is) => is.initiative_object)
  initiative_stage_array: InitiativeStage[];

  //auditable fields

  @Exclude()
  @Column(() => AuditableEntity, { prefix: '' })
  auditableFields: AuditableEntity;
}
