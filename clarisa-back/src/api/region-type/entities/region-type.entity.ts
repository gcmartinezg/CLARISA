import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AuditableEntity } from '../../../shared/entities/extends/auditable-entity.entity';
import { Region } from '../../region/entities/region.entity';

@Entity('region_types')
export class RegionType extends AuditableEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Region, (r) => r.region_type_object)
  regions: Region[];
}
