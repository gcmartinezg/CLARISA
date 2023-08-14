import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Query,
  ParseIntPipe,
  Res,
  HttpException,
  HttpStatus,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { CgiarEntityService } from './cgiar-entity.service';
import { UpdateCgiarEntityDto } from './dto/update-cgiar-entity.dto';
import { Response } from 'express';
import { CgiarEntity } from './entities/cgiar-entity.entity';
import { FindAllOptions } from '../../shared/entities/enums/find-all-options';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class CgiarEntityController {
  constructor(private readonly cgiarEntityService: CgiarEntityService) {}

  @Get()
  async findAll(
    @Query('show') show: FindAllOptions,
    @Query('type') type: string,
  ) {
    return await this.cgiarEntityService.findAll(show, type);
  }

  @Get('get/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.cgiarEntityService.findOne(id);
  }

  @Patch('update')
  async update(
    @Res() res: Response,
    @Body() updateCgiarEntityDtoList: UpdateCgiarEntityDto[],
  ) {
    try {
      const result: CgiarEntity[] = await this.cgiarEntityService.update(
        updateCgiarEntityDtoList,
      );
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
