import { Injectable } from '@nestjs/common';
import { FindOptionsWhere } from 'typeorm';
import { FindAllOptions } from '../../shared/entities/enums/find-all-options';
import { SourceOption } from '../../shared/entities/enums/source-options';
import { UpdateInnovationTypeDto } from './dto/update-innovation-type.dto';
import { InnovationType } from './entities/innovation-type.entity';
import { InnovationTypeRepository } from './repositories/innovation-type.repository';

@Injectable()
export class InnovationTypeService {
  constructor(private innovationTypesRepository: InnovationTypeRepository) {}

  async findAll(
    option: FindAllOptions = FindAllOptions.SHOW_ONLY_ACTIVE,
    type: string = SourceOption.ONE_CGIAR.path,
  ): Promise<InnovationType[]> {
    let whereClause: FindOptionsWhere<InnovationType> = {};
    const incomingType = SourceOption.getfromPath(type);

    switch (type) {
      case SourceOption.ALL.path:
        // do nothing. no extra conditions needed
        break;
      case SourceOption.ONE_CGIAR.path:
      case SourceOption.LEGACY.path:
      case SourceOption.INNOVATION_CATALOG.path:
        whereClause = {
          ...whereClause,
          source_id: incomingType.source_id,
        };
        break;
      default:
        throw Error('?!');
    }

    switch (option) {
      case FindAllOptions.SHOW_ALL:
        return await this.innovationTypesRepository.find({
          where: whereClause,
        });
      case FindAllOptions.SHOW_ONLY_ACTIVE:
      case FindAllOptions.SHOW_ONLY_INACTIVE:
        whereClause = {
          ...whereClause,
          auditableFields: {
            is_active: option === FindAllOptions.SHOW_ONLY_ACTIVE,
          },
        };
        return await this.innovationTypesRepository.find({
          where: whereClause,
        });
      default:
        throw Error('?!');
    }
  }

  async findOne(id: number): Promise<InnovationType> {
    return await this.innovationTypesRepository.findOneBy({
      id,
      auditableFields: { is_active: true },
    });
  }

  async update(updateInnovationTypeDto: UpdateInnovationTypeDto[]) {
    return await this.innovationTypesRepository.save(updateInnovationTypeDto);
  }
}
