import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Query,
  ParseIntPipe,
  Res,
  HttpStatus,
  HttpException,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { FindAllOptions } from '../../shared/entities/enums/find-all-options';
import { ActionAreaOutcomeIndicatorService } from './action-area-outcome-indicator.service';
import { UpdateActionAreaOutcomeIndicatorDto } from './dto/update-action-area-outcome-indicator.dto';
import { ActionAreaOutcomeIndicator } from './entities/action-area-outcome-indicator.entity';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class ActionAreaOutcomeIndicatorController {
  constructor(
    private readonly actionAreaOutcomeIndicatorService: ActionAreaOutcomeIndicatorService,
  ) {}

  @Get()
  async findAll(@Query('show') show: FindAllOptions) {
    return await this.actionAreaOutcomeIndicatorService.findAll(show);
  }

  @Get('get/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.actionAreaOutcomeIndicatorService.findOne(id);
  }

  @Patch('update')
  async update(
    @Res() res: Response,
    @Body()
    updateActionAreaOutcomeIndicatorDtoList: UpdateActionAreaOutcomeIndicatorDto[],
  ) {
    try {
      const result: ActionAreaOutcomeIndicator[] =
        await this.actionAreaOutcomeIndicatorService.update(
          updateActionAreaOutcomeIndicatorDtoList,
        );
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
