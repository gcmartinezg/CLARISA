import { ScienceGroup } from 'src/api/science-group/entities/science-group.entity';
import { AuditableEntity } from 'src/shared/entities/extends/auditable-entity.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UnitType } from './unit-type';

@Entity('units')
export class Unit extends AuditableEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  financial_code: string;

  @Column()
  description: string;

  @Column()
  parent_id: number;

  @ManyToOne(() => Unit, (u) => u.children)
  @JoinColumn({ name: 'parent_id' })
  parent: Promise<Unit>;

  @OneToMany(() => Unit, (u) => u.parent)
  children: Promise<Unit[]>;

  @Column()
  science_group_id: number;

  @ManyToOne(() => ScienceGroup, (u) => u.units)
  @JoinColumn({ name: 'science_group_id' })
  science_group: Promise<ScienceGroup>;

  @Column()
  unit_type_id: number;

  @ManyToOne(() => UnitType, (u) => u.units)
  @JoinColumn({ name: 'unit_type_id' })
  unit_type: Promise<UnitType>;
}
