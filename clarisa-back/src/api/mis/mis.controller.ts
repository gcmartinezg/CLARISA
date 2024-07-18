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
import { MisService } from './mis.service';
import { UpdateMisDto } from './dto/update-mis.dto';
import { Mis } from './entities/mis.entity';
import { Response } from 'express';
import { FindAllOptions } from '../../shared/entities/enums/find-all-options';
import {
  ApiExcludeEndpoint,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { MisDto } from './dto/mis.dto';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('MIS')
export class MisController {
  constructor(private readonly misService: MisService) {}

  @Get()
  @ApiQuery({
    name: 'show',
    enum: FindAllOptions,
    required: false,
    description: 'Show active, inactive or all MISes. Defaults to active.',
  })
  @ApiOkResponse({ type: [MisDto] })
  async findAll(@Query('show') show: FindAllOptions) {
    return await this.misService.findAll(show);
  }

  @Get('get/:id')
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'The id of the MIS',
  })
  @ApiOkResponse({ type: [MisDto] })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.misService.findOne(id);
  }

  @Patch('update')
  @ApiExcludeEndpoint()
  async update(@Res() res: Response, @Body() updateMisDtoList: UpdateMisDto[]) {
    try {
      const result: Mis[] = await this.misService.update(updateMisDtoList);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
