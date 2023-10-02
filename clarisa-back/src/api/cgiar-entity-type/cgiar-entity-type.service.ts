import { Injectable } from '@nestjs/common';
import { FindOptionsWhere, In } from 'typeorm';
import { CgiarEntityTypeOption } from '../../shared/entities/enums/cgiar-entity-types';
import { FindAllOptions } from '../../shared/entities/enums/find-all-options';
import { UpdateCgiarEntityTypeDto } from './dto/update-cgiar-entity-type.dto';
import { CgiarEntityType } from './entities/cgiar-entity-type.entity';
import { CgiarEntityTypeRepository } from './repositories/cgiar-entity-type.repository';

@Injectable()
export class CgiarEntityTypeService {
  constructor(private cgiarEntityTypeRepository: CgiarEntityTypeRepository) {}

  private readonly defaultTypes = [
    CgiarEntityTypeOption.CRP,
    CgiarEntityTypeOption.PLATFORM,
    CgiarEntityTypeOption.CENTER,
    CgiarEntityTypeOption.INITIATIVES,
    CgiarEntityTypeOption.ONE_CGIAR_PLATFORM,
    CgiarEntityTypeOption.ONE_CGIAR_SGP,
  ].map((cet) => cet.entity_type_id);

  private readonly whereClause: FindOptionsWhere<CgiarEntityType> = {
    id: In(this.defaultTypes),
  };

  async findAll(
    option: FindAllOptions = FindAllOptions.SHOW_ONLY_ACTIVE,
  ): Promise<CgiarEntityType[]> {
    switch (option) {
      case FindAllOptions.SHOW_ALL:
        return await this.cgiarEntityTypeRepository.find({
          where: this.whereClause,
        });
      case FindAllOptions.SHOW_ONLY_ACTIVE:
      case FindAllOptions.SHOW_ONLY_INACTIVE:
        return await this.cgiarEntityTypeRepository.find({
          where: {
            ...this.whereClause,
            auditableFields: {
              is_active: option === FindAllOptions.SHOW_ONLY_ACTIVE,
            },
          },
        });
      default:
        throw Error('?!');
    }
  }

  async findOne(id: number): Promise<CgiarEntityType> {
    return await this.cgiarEntityTypeRepository.findOneBy({
      id,
      auditableFields: { is_active: true },
    });
  }

  async update(
    updateCgiarEntityTypeDtoList: UpdateCgiarEntityTypeDto[],
  ): Promise<CgiarEntityType[]> {
    return await this.cgiarEntityTypeRepository.save(
      updateCgiarEntityTypeDtoList,
    );
  }
}
