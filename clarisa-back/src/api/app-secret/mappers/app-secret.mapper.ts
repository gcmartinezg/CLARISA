import { Injectable } from '@nestjs/common';
import { AppSecret } from '../entities/app-secret.entity';
import { AppSecretDto } from '../dto/app-secret.dto';

@Injectable()
export class AppSecretMapper {
  public classToDto(appSecret: AppSecret): AppSecretDto {
    const appSecretDto: AppSecretDto = new AppSecretDto();

    appSecretDto.client_id = appSecret.relation_uuid;

    if (appSecret.sender_mis_object) {
      appSecretDto.sender_mis = appSecret.sender_mis_object.name;
    }

    if (appSecret.receiver_mis_object) {
      appSecretDto.receiver_mis = appSecret.receiver_mis_object.name;
    }

    if (appSecret.secret) {
      appSecretDto.secret = appSecret.secret;
    }

    return appSecretDto;
  }

  public classListToDtoList(appSecrets: AppSecret[]): AppSecretDto[] {
    return appSecrets.map((appSecret) => this.classToDto(appSecret));
  }
}
