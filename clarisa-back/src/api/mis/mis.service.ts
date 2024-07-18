import { Injectable } from '@nestjs/common';
import { FindAllOptions } from '../../shared/entities/enums/find-all-options';
import { UpdateMisDto } from './dto/update-mis.dto';
import { Mis } from './entities/mis.entity';
import { MisRepository } from './repositories/mis.repository';
import { MisDto } from './dto/mis.dto';
import { FindOptionsSelect } from 'typeorm';

@Injectable()
export class MisService {
  constructor(private misRepository: MisRepository) {}
  private readonly _select: FindOptionsSelect<Mis> = {
    id: true,
    name: true,
    acronym: true,
    main_contact_point_id: true,
  };

  async findAll(
    option: FindAllOptions = FindAllOptions.SHOW_ONLY_ACTIVE,
  ): Promise<MisDto[]> {
    switch (option) {
      case FindAllOptions.SHOW_ALL:
        return await this.misRepository.find({
          select: this._select,
        });
      case FindAllOptions.SHOW_ONLY_ACTIVE:
      case FindAllOptions.SHOW_ONLY_INACTIVE:
        return await this.misRepository.find({
          where: {
            auditableFields: {
              is_active: option === FindAllOptions.SHOW_ONLY_ACTIVE,
            },
          },
          select: this._select,
        });
      default:
        throw Error('?!');
    }
  }

  async findOne(id: number): Promise<MisDto> {
    return await this.misRepository.findOne({
      where: { id, auditableFields: { is_active: true } },
      select: this._select,
    });
  }

  async update(updateMisDto: UpdateMisDto[]) {
    return await this.misRepository.save(updateMisDto);
  }
}
