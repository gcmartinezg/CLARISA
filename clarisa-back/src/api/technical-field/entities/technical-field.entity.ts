import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AuditableEntity } from '../../../shared/entities/extends/auditable-entity.entity';

@Entity('technical_fields')
export class TechnicalField {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'text', nullable: true })
  name: string;

  //auditable fields

  @Column(() => AuditableEntity, { prefix: '' })
  auditableFields: AuditableEntity;
}
