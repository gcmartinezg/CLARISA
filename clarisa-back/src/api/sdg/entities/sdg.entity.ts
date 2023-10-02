import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AuditableEntity } from '../../../shared/entities/extends/auditable-entity.entity';
import { SdgTarget } from '../../sdg-target/entities/sdg-target.entity';

@Entity('sustainable_development_goals')
export class Sdg {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint', nullable: true })
  smo_code: number;

  @Column({ type: 'varchar', length: 10, nullable: true })
  financial_code: string;

  @Column({ type: 'text', nullable: true })
  short_name: string;

  @Column({ type: 'text', nullable: true })
  full_name: string;

  @Column({ type: 'text', nullable: true })
  icon: string;

  @Column({ type: 'text', nullable: true })
  color: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  //object relations

  @OneToMany(() => SdgTarget, (sdgt) => sdgt.sdg_object)
  sdg_target_array: SdgTarget[];

  //auditable fields

  @Exclude()
  @Column(() => AuditableEntity, { prefix: '' })
  auditableFields: AuditableEntity;
}
