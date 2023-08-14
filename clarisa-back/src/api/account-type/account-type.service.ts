import { Injectable } from '@nestjs/common';
import { FindAllOptions } from '../../shared/entities/enums/find-all-options';
import { AccountTypeDto } from './dto/account-type.dto';
import { UpdateAccountTypeDto } from './dto/update-account-type.dto';
import { AccountType } from './entities/account-type.entity';
import { AccountTypeMapper } from './mappers/account-type.mapper';
import { AccountTypeRepository } from './repositories/account-type.repository';

@Injectable()
export class AccountTypeService {
  constructor(
    private _accountTypeRepository: AccountTypeRepository,
    private _accountTypeMapper: AccountTypeMapper,
  ) {}

  async findAll(
    option: FindAllOptions = FindAllOptions.SHOW_ONLY_ACTIVE,
  ): Promise<AccountTypeDto[]> {
    if (!Object.values<string>(FindAllOptions).includes(option)) {
      throw Error('?!');
    }

    const accounts: AccountType[] =
      await this._accountTypeRepository.findAllAccountTypes(option);
    const accountTypeDtos: AccountTypeDto[] = accounts.map((a) =>
      this._accountTypeMapper.classToDto(a),
    );

    return accountTypeDtos;
  }

  async findOne(id: number): Promise<AccountTypeDto> {
    const result: AccountType = await this._accountTypeRepository.findOne({
      where: {
        id,
        auditableFields: { is_active: true },
      },
    });

    return this._accountTypeMapper.classToDto(result);
  }

  async update(
    updateUserDtoList: UpdateAccountTypeDto[],
  ): Promise<AccountType[]> {
    return await this._accountTypeRepository.save(updateUserDtoList);
  }
}
