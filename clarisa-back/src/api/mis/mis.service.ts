import { Injectable } from '@nestjs/common';
import { FindAllOptions } from '../../shared/entities/enums/find-all-options';
import { UpdateMisDto } from './dto/update-mis.dto';
import { Mis } from './entities/mis.entity';
import { MisRepository } from './repositories/mis.repository';

@Injectable()
export class MisService {
  constructor(private misRepository: MisRepository) {}

  async findAll(
    option: FindAllOptions = FindAllOptions.SHOW_ONLY_ACTIVE,
  ): Promise<Mis[]> {
    switch (option) {
      case FindAllOptions.SHOW_ALL:
        return await this.misRepository.find();
      case FindAllOptions.SHOW_ONLY_ACTIVE:
      case FindAllOptions.SHOW_ONLY_INACTIVE:
        return await this.misRepository.find({
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

  async findOneByAcronym(acronym: string): Promise<Mis> {
    return await this.misRepository.findOneBy({
      acronym,
      auditableFields: { is_active: true },
    });
  }

  async findOne(id: number): Promise<Mis> {
    return await this.misRepository.findOneBy({
      id,
      auditableFields: { is_active: true },
    });
  }

  async update(updateMisDto: UpdateMisDto[]) {
    return await this.misRepository.save(updateMisDto);
  }
}
