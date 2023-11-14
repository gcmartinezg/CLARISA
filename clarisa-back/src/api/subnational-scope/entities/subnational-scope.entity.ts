import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AuditableEntity } from '../../../shared/entities/extends/auditable-entity.entity';
import { Country } from '../../country/entities/country.entity';

@Entity('subnational_scope')
export class SubnationalScope {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 20, nullable: true, unique: true })
  code: string;

  @Column({ type: 'text', nullable: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  name_language_iso_3: string;

  @Column({ type: 'text', nullable: true })
  subdivision_category_name: string;

  @Column({ type: 'bigint', nullable: false })
  country_id: number;

  //object relations

  @ManyToOne(() => Country, (country) => country.subnational_scope_array)
  @JoinColumn({ name: 'country_id' })
  country_object: Country;

  //auditable fields

  @Exclude()
  @Column(() => AuditableEntity, { prefix: '' })
  auditableFields: AuditableEntity;
}
