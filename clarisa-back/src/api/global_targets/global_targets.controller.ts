import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpStatus, HttpException, Res, ParseIntPipe } from '@nestjs/common';
import { GlobalTargetsService } from './global_targets.service';
import { CreateGlobalTargetDto } from './dto/create-global_target.dto';
import { UpdateGlobalTargetDto } from './dto/update-global_target.dto';
import { GlobalTarget } from './entities/global_target.entity';
import { Response } from 'express';
import { FindAllOptions } from 'src/shared/entities/enums/find-all-options';

@Controller()
export class GlobalTargetsController {
  constructor(private readonly globalTargetsService: GlobalTargetsService) {}


  @Get()
  findAll(@Query('show') show : FindAllOptions) {
    return this.globalTargetsService.findAll(show);
  }

  @Get('findById/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.globalTargetsService.findOne(id);
  }

  @Patch('update')
  async update(@Res() res: Response, @Body() updateUserDtoList: UpdateGlobalTargetDto[]) {
    try {
      const result : GlobalTarget[] = await this.globalTargetsService.update(updateUserDtoList);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }


}
