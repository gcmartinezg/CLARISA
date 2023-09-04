import { Injectable } from '@nestjs/common';
import { FindAllOptions } from '../../shared/entities/enums/find-all-options';
import { AccountDto } from './dto/account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';
import { AccountMapper } from './mappers/account.mapper';
import { AccountRepository } from './repositories/account.repository';

@Injectable()
export class AccountService {
  constructor(
    private _accountRepository: AccountRepository,
    private _accountMapper: AccountMapper,
  ) {}

  async findAll(
    option: FindAllOptions = FindAllOptions.SHOW_ONLY_ACTIVE,
  ): Promise<AccountDto[]> {
    if (!Object.values<string>(FindAllOptions).includes(option)) {
      throw Error('?!');
    }

    const accounts: Account[] =
      await this._accountRepository.findAllAccounts(option);
    const accountDtos: AccountDto[] = accounts.map((a) =>
      this._accountMapper.classToDto(a),
    );

    return accountDtos.sort((a, b) => a.code - b.code);
  }

  async findOne(id: number): Promise<AccountDto> {
    const result: Account = await this._accountRepository.findOne({
      where: {
        id,
        auditableFields: { is_active: true },
      },
      relations: {
        parent: true,
        account_type: true,
      },
    });

    return this._accountMapper.classToDto(result);
  }

  async update(updateInitiativeDto: UpdateAccountDto[]) {
    return await this._accountRepository.save(updateInitiativeDto);
  }
}
