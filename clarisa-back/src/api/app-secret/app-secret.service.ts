import { Injectable } from '@nestjs/common';
import { CreateAppSecretDto } from './dto/create-app-secret.dto';
import { UpdateAppSecretDto } from './dto/update-app-secret.dto';

@Injectable()
export class AppSecretService {
  create(createAppSecretDto: CreateAppSecretDto) {
    return 'This action adds a new appSecret';
  }

  findAll() {
    return `This action returns all appSecret`;
  }

  findOne(id: number) {
    return `This action returns a #${id} appSecret`;
  }

  update(id: number, updateAppSecretDto: UpdateAppSecretDto) {
    return `This action updates a #${id} appSecret`;
  }

  remove(id: number) {
    return `This action removes a #${id} appSecret`;
  }
}
