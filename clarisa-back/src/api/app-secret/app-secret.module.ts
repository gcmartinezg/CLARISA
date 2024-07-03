import { Module } from '@nestjs/common';
import { AppSecretService } from './app-secret.service';
import { AppSecretController } from './app-secret.controller';

@Module({
  controllers: [AppSecretController],
  providers: [AppSecretService],
})
export class AppSecretModule {}
