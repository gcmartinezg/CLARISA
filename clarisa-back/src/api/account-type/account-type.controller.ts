import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  ClassSerializerInterceptor,
  UseInterceptors,
  Query,
  ParseIntPipe,
  Res,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { FindAllOptions } from '../../shared/entities/enums/find-all-options';

import { AccountTypeService } from './account-type.service';
import { UpdateAccountTypeDto } from './dto/update-account-type.dto';
import { AccountType } from './entities/account-type.entity';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class AccountTypeController {
  constructor(private readonly accountTypeService: AccountTypeService) {}

  @Get()
  async findAll(@Query('show') show: FindAllOptions) {
    return await this.accountTypeService.findAll(show);
  }

  @Get('get/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.accountTypeService.findOne(id);
  }

  @Patch('update')
  async update(
    @Res() res: Response,
    @Body() updateUserDtoList: UpdateAccountTypeDto[],
  ) {
    try {
      const result: AccountType[] =
        await this.accountTypeService.update(updateUserDtoList);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
