import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
  Query,
  ParseIntPipe,
  Res,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { FindAllOptions } from '../../shared/entities/enums/find-all-options';

import { AccountService } from './account.service';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  async findAll(@Query('show') show: FindAllOptions) {
    return await this.accountService.findAll(show);
  }

  @Get('get/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.accountService.findOne(id);
  }

  @Patch('update')
  async update(
    @Res() res: Response,
    @Body() updateUserDtoList: UpdateAccountDto[],
  ) {
    try {
      const result: Account[] =
        await this.accountService.update(updateUserDtoList);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
