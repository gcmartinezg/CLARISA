import { Injectable } from '@nestjs/common';
import { FindAllOptions } from '../../shared/entities/enums/find-all-options';
import { LegacySdgDto } from './dto/legacy-sdg.dto';
import { UpdateSdgDto } from './dto/update-sdg.dto';
import { Sdg } from './entities/sdg.entity';
import { SdgRepository } from './repositories/sdg.repository';

@Injectable()
export class SdgService {
  constructor(private sdgsRepository: SdgRepository) {}

  async findAll(
    option: FindAllOptions = FindAllOptions.SHOW_ONLY_ACTIVE,
    isLegacy = false,
  ) {
    let response: Sdg[];
    switch (option) {
      case FindAllOptions.SHOW_ALL:
        response = await this.sdgsRepository.find();
        break;
      case FindAllOptions.SHOW_ONLY_ACTIVE:
      case FindAllOptions.SHOW_ONLY_INACTIVE:
        response = await this.sdgsRepository.find({
          where: {
            auditableFields: {
              is_active: option === FindAllOptions.SHOW_ONLY_ACTIVE,
            },
          },
        });
        break;
      default:
        throw Error('?!');
    }

    return !isLegacy ? response : this.mapToLegacyResponse(response);
  }

  mapToLegacyResponse(response: Sdg[]): LegacySdgDto[] {
    return response.map((r) => {
      const mappedSdg: LegacySdgDto = new LegacySdgDto();

      mappedSdg.financialCode = r.financial_code;
      mappedSdg.fullName = r.full_name;
      mappedSdg.shortName = r.short_name;
      mappedSdg.usndCode = r.smo_code;

      return mappedSdg;
    });
  }

  async findOne(id: number): Promise<Sdg> {
    return await this.sdgsRepository.findOneBy({
      id,
      auditableFields: { is_active: true },
    });
  }

  async update(updateSdgDto: UpdateSdgDto[]) {
    return await this.sdgsRepository.save(updateSdgDto);
  }
}
