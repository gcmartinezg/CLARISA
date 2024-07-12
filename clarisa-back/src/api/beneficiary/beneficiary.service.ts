import { Injectable } from '@nestjs/common';
import { FindAllOptions } from '../../shared/entities/enums/find-all-options';
import { UpdateBeneficiaryDto } from './dto/update-beneficiary.dto';
import { Beneficiary } from './entities/beneficiary.entity';
import { BeneficiaryRepository } from './repositories/beneficiary.repository';
import { FindOptionsSelect } from 'typeorm';
import { BeneficiaryDto } from './dto/beneficiary.dto';

@Injectable()
export class BeneficiaryService {
  constructor(private beneficiaryRepository: BeneficiaryRepository) {}
  private readonly _select: FindOptionsSelect<Beneficiary> = {
    id: true,
    name: true,
  };

  async findAll(
    option: FindAllOptions = FindAllOptions.SHOW_ONLY_ACTIVE,
  ): Promise<BeneficiaryDto[]> {
    switch (option) {
      case FindAllOptions.SHOW_ALL:
        return await this.beneficiaryRepository.find({
          select: this._select,
        });
      case FindAllOptions.SHOW_ONLY_ACTIVE:
      case FindAllOptions.SHOW_ONLY_INACTIVE:
        return await this.beneficiaryRepository.find({
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

  async findOne(id: number): Promise<BeneficiaryDto> {
    return await this.beneficiaryRepository.findOne({
      where: { id, auditableFields: { is_active: true } },
      select: this._select,
    });
  }

  async update(
    updateBeneficiaryDtoList: UpdateBeneficiaryDto[],
  ): Promise<Beneficiary[]> {
    return await this.beneficiaryRepository.save(updateBeneficiaryDtoList);
  }
}
