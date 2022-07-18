import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ApiModule } from './api/api.module';
import { UserModule } from './api/user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {routes} from './routes';

@Module({
  imports: [
    RouterModule.register(routes),
    ApiModule,
    UserModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
