import { Injectable } from '@nestjs/common';
import { MisService } from '../mis/mis.service';
import { CreateAppSecretDto } from './dto/create-app-secret.dto';
import { AppSecretRepository } from './repositories/app-secret.repository';
import { generate } from 'generate-password';
import { ResponseDto } from '../../shared/entities/dtos/response.dto';
import { AppSecretMapper } from './mappers/app-secret.mapper';
import { AppSecret } from './entities/app-secret.entity';
import { AppSecretDto } from './dto/app-secret.dto';
import { FindAllOptions } from '../../shared/entities/enums/find-all-options';

@Injectable()
export class AppSecretService {
  constructor(
    private _misService: MisService,
    private _appSecretRepository: AppSecretRepository,
    private _appSecretMapper: AppSecretMapper,
  ) {}

  async create(createAppSecretDto: CreateAppSecretDto) {
    if (!createAppSecretDto) {
      throw new Error('Missing required data');
    } else if (!createAppSecretDto.sender_mis) {
      throw new Error('Missing sender MIS');
    } else if (!createAppSecretDto.receiver_mis) {
      throw new Error('Missing receiver MIS');
    }

    const senderMis = await this._misService.findOneByAcronym(
      createAppSecretDto.sender_mis,
    );
    if (!senderMis) {
      throw new Error(
        `Sender MIS with acronym "${createAppSecretDto.sender_mis}" not found`,
      );
    }

    const receiverMis = await this._misService.findOneByAcronym(
      createAppSecretDto.receiver_mis,
    );
    if (!receiverMis) {
      throw new Error(
        `Receiver MIS with acronym "${createAppSecretDto.receiver_mis}" not found`,
      );
    }

    const existingAppSecret = await this._appSecretRepository.findOneBy({
      sender_mis_id: senderMis.id,
      receiver_mis_id: receiverMis.id,
    });

    if (existingAppSecret) {
      throw new Error(
        `AppSecret already exists between sender MIS "${senderMis.acronym}" and receiver MIS "${receiverMis.acronym} with ID "${existingAppSecret.id}"`,
      );
    }

    const appSecret = this._appSecretRepository.create({
      sender_mis_id: senderMis.id,
      receiver_mis_id: receiverMis.id,
      relation_uuid: crypto.randomUUID(),
      secret: generate({ length: 32, numbers: true, symbols: true }),
    });

    return this._appSecretRepository.save(appSecret).then((appSecret) => {
      return ResponseDto.createCreatedResponse(
        this._appSecretMapper.classToDto(appSecret),
        AppSecretService,
      );
    });
  }

  async findAll(
    option: FindAllOptions = FindAllOptions.SHOW_ONLY_ACTIVE,
  ): Promise<AppSecretDto[]> {
    let appSecrets: AppSecret[] = [];

    switch (option) {
      case FindAllOptions.SHOW_ALL:
        appSecrets = await this._appSecretRepository.find();
        break;
      case FindAllOptions.SHOW_ONLY_ACTIVE:
      case FindAllOptions.SHOW_ONLY_INACTIVE:
        appSecrets = await this._appSecretRepository.find({
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

    return this._appSecretMapper.classListToDtoList(appSecrets);
  }

  async findOne(id: number): Promise<AppSecretDto> {
    const appSecret: AppSecret = await this._appSecretRepository.findOneBy({
      id,
      auditableFields: { is_active: true },
    });

    return appSecret ? this._appSecretMapper.classToDto(appSecret) : null;
  }
}
