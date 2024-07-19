import { Injectable } from '@nestjs/common';
import { FindAllOptions } from '../../shared/entities/enums/find-all-options';
import { UpdateActionAreaDto } from './dto/update-action-area.dto';
import { ActionArea } from './entities/action-area.entity';
import { ActionAreaRepository } from './repositories/action-area.repository';

@Injectable()
export class ActionAreaService {
  constructor(private actionAreasRepository: ActionAreaRepository) {}

  async findAll(
    option: FindAllOptions = FindAllOptions.SHOW_ONLY_ACTIVE,
  ): Promise<ActionArea[]> {
    switch (option) {
      case FindAllOptions.SHOW_ALL:
        return await this.actionAreasRepository.find();
      case FindAllOptions.SHOW_ONLY_ACTIVE:
      case FindAllOptions.SHOW_ONLY_INACTIVE:
        return await this.actionAreasRepository.find({
          where: {
            auditableFields: {
              is_active: option === FindAllOptions.SHOW_ONLY_ACTIVE,
            },
          },
        });
      default:
        throw Error('?!');
    }
  }

  async findOne(id: number): Promise<ActionArea> {
    return await this.actionAreasRepository.findOneBy({
      id,
      auditableFields: { is_active: true },
    });
  }

  async update(
    updateUserDtoList: UpdateActionAreaDto[],
  ): Promise<ActionArea[]> {
    return await this.actionAreasRepository.save(updateUserDtoList);
  }
}
