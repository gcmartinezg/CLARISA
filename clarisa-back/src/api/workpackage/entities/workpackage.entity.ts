import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AuditableEntity } from '../../../shared/entities/extends/auditable-entity.entity';
import { InitiativeStage } from '../../initiative/entities/initiative-stage.entity';
import { WorkpackageCountry } from './workpackage-country.entity';
import { WorkpackageRegion } from './workpackage-region.entity';

@Entity('submission_tool_work_packages')
export class Workpackage {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'text', nullable: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  results: string;

  @Column({ type: 'text', nullable: true })
  pathway_content: string;

  @Column({ type: 'tinyint', nullable: true })
  is_global_dimension: boolean;

  @Column({ type: 'text', nullable: true })
  acronym: string;

  @Column({ type: 'bigint', nullable: true })
  wp_official_code: number;

  //relations

  @Column({ type: 'bigint', nullable: false })
  submission_tool_initiative_stage_id: number;

  //object relations

  @ManyToOne(() => InitiativeStage, (is) => is.work_package_array)
  @JoinColumn({ name: 'submission_tool_initiative_stage_id' })
  initiative_stage_object: InitiativeStage;

  @OneToMany(() => WorkpackageCountry, (wpc) => wpc.work_package_object)
  countries: WorkpackageCountry[];

  @OneToMany(() => WorkpackageRegion, (wpr) => wpr.work_package_object)
  regions: WorkpackageRegion[];

  //auditable fields

  @Exclude()
  @Column(() => AuditableEntity, { prefix: '' })
  auditableFields: AuditableEntity;
}
