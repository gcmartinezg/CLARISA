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
import { CountryRegion } from '../../country/entities/country-region.entity';
import { RegionType } from '../../region-type/entities/region-type.entity';
import { WorkpackageRegion } from '../../workpackage/entities/workpackage-region.entity';
import { RegionMapping } from './region-mapping.entity';

@Entity('regions')
export class Region {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint', nullable: true })
  iso_numeric: number;

  @Column({ type: 'text', nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  acronym: string;

  //relations

  @Column({ type: 'bigint', nullable: false })
  region_type_id: number;

  @Column({ type: 'bigint', nullable: true })
  parent_id: number;

  //object relations

  @ManyToOne(() => Region, (parent) => parent.children)
  @JoinColumn({ name: 'parent_id' })
  parent_object: Region;

  @OneToMany(() => Region, (child) => child.parent_object)
  children: Region[];

  @OneToMany(() => CountryRegion, (cr) => cr.region_object)
  country_region_array: CountryRegion[];

  @ManyToOne(() => RegionType, (rt) => rt.regions)
  @JoinColumn({ name: 'region_type_id' })
  region_type_object: RegionType;

  @OneToMany(() => RegionMapping, (rm) => rm.source_region_object)
  source_region_array: RegionMapping[];

  @OneToMany(() => RegionMapping, (rm) => rm.target_region_object)
  target_region_array: RegionMapping[];

  @OneToMany(() => WorkpackageRegion, (wpr) => wpr.region_object)
  work_package_region_array: WorkpackageRegion[];

  //auditable fields

  @Exclude()
  @Column(() => AuditableEntity, { prefix: '' })
  auditableFields: AuditableEntity;
}
