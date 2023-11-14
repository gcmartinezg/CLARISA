import { Injectable } from '@nestjs/common';
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';
import { SubnationalScope } from '../entities/subnational-scope.entity';
import { FindAllOptions } from '../../../shared/entities/enums/find-all-options';
import { SubnationalScopeDto } from '../dto/subnational-scope.dto';

@Injectable()
export class SubnationalScopeRepository extends Repository<SubnationalScope> {
  constructor(private dataSource: DataSource) {
    super(SubnationalScope, dataSource.createEntityManager());
  }

  private getQueryBuilder(): SelectQueryBuilder<SubnationalScope> {
    return this.createQueryBuilder('ss')
      .select('ss.id', 'id')
      .addSelect('ss.code', 'code')
      .addSelect('ss.name', 'name')
      .addSelect('ss.name_language_iso_3', 'name_language_iso_3')
      .addSelect('ss.subdivision_category_name', 'subdivision_category_name')
      .addSelect('ss.country_id', 'country_id')
      .leftJoin('ss.country_object', 'ss_c')
      .addSelect('ss_c.iso_alpha_2', 'country_iso_2')
      .addSelect('ss_c.name', 'country_name')
      .where('ss_c.is_active = true');
  }

  async findSubnationalScope(
    option: FindAllOptions = FindAllOptions.SHOW_ONLY_ACTIVE,
    countryId?: number,
    countryIsoAlpha2?: string,
  ): Promise<SubnationalScopeDto[]> {
    let subnationalScopeDtos: SubnationalScopeDto[] = [];

    let currentQueryBuilder: SelectQueryBuilder<SubnationalScope> =
      this.getQueryBuilder();

    switch (option) {
      case FindAllOptions.SHOW_ALL:
        currentQueryBuilder = currentQueryBuilder.addSelect(
          'ss.is_active',
          'is_active',
        );
        break;
      case FindAllOptions.SHOW_ONLY_ACTIVE:
      case FindAllOptions.SHOW_ONLY_INACTIVE:
        currentQueryBuilder = currentQueryBuilder.andWhere(
          'ss.is_active = :isActive',
          {
            isActive: option === FindAllOptions.SHOW_ONLY_ACTIVE,
          },
        );
        break;
    }

    if (countryId) {
      currentQueryBuilder = currentQueryBuilder.andWhere(
        'ss.country_id = :countryId',
        { countryId },
      );
    } else if (countryIsoAlpha2) {
      currentQueryBuilder = currentQueryBuilder.andWhere(
        'ss_c.iso_alpha_2 = :countryIsoAlpha2',
        { countryIsoAlpha2 },
      );
    }

    subnationalScopeDtos = await currentQueryBuilder.getRawMany();

    return subnationalScopeDtos;
  }

  async findOneSubnationalScope(id: number): Promise<SubnationalScopeDto> {
    let currentQueryBuilder = this.getQueryBuilder();

    currentQueryBuilder = currentQueryBuilder
      .andWhere('ss.id = :id', { id })
      .andWhere('ss.is_active = true');

    return await currentQueryBuilder.getRawOne();
  }
}
