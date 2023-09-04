import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Query,
  Res,
  HttpStatus,
  HttpException,
  ParseIntPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { FindAllOptions } from '../../shared/entities/enums/find-all-options';
import { ActionAreaService } from './action-area.service';
import { UpdateActionAreaDto } from './dto/update-action-area.dto';
import { ActionArea } from './entities/action-area.entity';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class ActionAreaController {
  constructor(private readonly actionAreaService: ActionAreaService) {}

  @Get()
  async findAll(@Query('show') show: FindAllOptions) {
    return await this.actionAreaService.findAll(show);
  }

  @Get('get/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.actionAreaService.findOne(id);
  }

  @Patch('update')
  async update(
    @Res() res: Response,
    @Body() updateUserDtoList: UpdateActionAreaDto[],
  ) {
    try {
      const result: ActionArea[] =
        await this.actionAreaService.update(updateUserDtoList);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
