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
import { RegionService } from './region.service';
import { UpdateRegionDto } from './dto/update-region.dto';
import { Response } from 'express';
import { Region } from './entities/region.entity';
import { FindAllOptions } from '../../shared/entities/enums/find-all-options';
import { RegionTypeEnum } from '../../shared/entities/enums/region-types';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @Get('un-regions')
  async findAllUNRegions(@Query('show') show: FindAllOptions) {
    return await this.regionService.findAll(RegionTypeEnum.UN_REGION, show);
  }

  @Get('one-cgiar-regions')
  async findAllCGIARRegions(@Query('show') show: FindAllOptions) {
    return await this.regionService.findAll(RegionTypeEnum.CGIAR_REGION, show);
  }

  @Get('get/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.regionService.findOne(id);
  }

  @Patch('update')
  async update(
    @Res() res: Response,
    @Body() updateRegionDtoList: UpdateRegionDto[],
  ) {
    try {
      const result: Region[] =
        await this.regionService.update(updateRegionDtoList);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
