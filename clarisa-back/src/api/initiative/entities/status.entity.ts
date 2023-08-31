import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AuditableEntity } from '../../../shared/entities/extends/auditable-entity.entity';
import { InitiativeStage } from './initiative-stage.entity';

@Entity('submission_tool_stages')
export class Stage {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 500, nullable: false })
  description: string;

  //object relations

  @OneToMany(() => InitiativeStage, (is) => is.stage_object)
  initiative_stage_array: InitiativeStage[];

  //auditable fields

  @Exclude()
  @Column(() => AuditableEntity, { prefix: '' })
  auditableFields: AuditableEntity;
}
