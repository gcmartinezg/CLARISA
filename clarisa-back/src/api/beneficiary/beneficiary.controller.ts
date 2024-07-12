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
import { BeneficiaryService } from './beneficiary.service';
import { UpdateBeneficiaryDto } from './dto/update-beneficiary.dto';
import { Response } from 'express';
import { Beneficiary } from './entities/beneficiary.entity';
import { FindAllOptions } from '../../shared/entities/enums/find-all-options';
import {
  ApiExcludeEndpoint,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { BeneficiaryDto } from './dto/beneficiary.dto';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Beneficiaries')
export class BeneficiaryController {
  constructor(private readonly beneficiaryService: BeneficiaryService) {}

  @Get()
  @ApiQuery({
    name: 'show',
    enum: FindAllOptions,
    required: false,
    description:
      'Show active, inactive or all beneficiaries. Defaults to active.',
  })
  @ApiOkResponse({ type: [BeneficiaryDto] })
  async findAll(@Query('show') show: FindAllOptions) {
    return await this.beneficiaryService.findAll(show);
  }

  @Get('get/:id')
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'The id of the beneficiary',
  })
  @ApiOkResponse({ type: [BeneficiaryDto] })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.beneficiaryService.findOne(id);
  }

  @Patch('update')
  @ApiExcludeEndpoint()
  async update(
    @Res() res: Response,
    @Body() updateBeneficiaryDtoList: UpdateBeneficiaryDto[],
  ) {
    try {
      const result: Beneficiary[] = await this.beneficiaryService.update(
        updateBeneficiaryDtoList,
      );
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
