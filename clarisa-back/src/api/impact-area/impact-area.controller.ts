import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, Res, HttpStatus, HttpException } from '@nestjs/common';
import { ImpactAreaService } from './impact-area.service';
import { CreateImpactAreaDto } from './dto/create-impact-area.dto';
import { UpdateImpactAreaDto } from './dto/update-impact-area.dto';
import { FindAllOptions } from 'src/shared/entities/enums/find-all-options';
import { Response } from 'express';
import { ImpactArea } from './entities/impact-area.entity';

@Controller()
export class ImpactAreaController {
  constructor(private readonly impactAreaService: ImpactAreaService) {}

  @Get()
  async findAll(@Query('show') show : FindAllOptions) {
    return await this.impactAreaService.findAll(show);
  }

  @Get('get/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.impactAreaService.findOne(id);
  }

  @Patch('update')
  async update(@Res() res: Response, @Body() updateImpactAreaDtoList: UpdateImpactAreaDto[]) {
    try {
      const result : ImpactArea[] = await this.impactAreaService.update(updateImpactAreaDtoList);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
