import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  HttpException,
  HttpStatus,
  Res,
  Query,
  ParseIntPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { GlossaryService } from './glossary.service';
import { UpdateGlossaryDto } from './dto/update-glossary.dto';
import { Glossary } from './entities/glossary.entity';
import { Response } from 'express';
import { FindAllOptions } from '../../shared/entities/enums/find-all-options';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class GlossaryController {
  constructor(private readonly glossaryService: GlossaryService) {}

  @Get()
  findAll(@Query('show') show: FindAllOptions) {
    return this.glossaryService.findAll(show);
  }

  @Get('/dashboard')
  findAllForDashboard(@Query('show') show: FindAllOptions) {
    return this.glossaryService.findAll(show, true);
  }

  @Get('get/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.glossaryService.findOne(id);
  }

  @Patch('update')
  async update(
    @Res() res: Response,
    @Body() updateGlossaryDto: UpdateGlossaryDto[],
  ) {
    try {
      const result: Glossary[] =
        await this.glossaryService.update(updateGlossaryDto);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
