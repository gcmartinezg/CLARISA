import {
  Controller,
  Get,
  Param,
  ClassSerializerInterceptor,
  UseInterceptors,
  Query,
  ParseIntPipe,
  Post,
  UseGuards,
  Body,
  Patch,
} from '@nestjs/common';
import { GetUserData } from '../../shared/decorators/user-data.decorator';
import { RespondRequestDto } from '../../shared/entities/dtos/respond-request.dto';
import { ResponseDto } from '../../shared/entities/dtos/response.dto';
import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';
import { PermissionGuard } from '../../shared/guards/permission.guard';
import { UserData } from '../../shared/interfaces/user-data';
import { CreatePartnerRequestDto } from './dto/create-partner-request.dto';
import { PartnerRequestDto } from './dto/partner-request.dto';
import { UpdatePartnerRequestDto } from './dto/update-partner-request.dto';
import { PartnerRequestService } from './partner-request.service';
import { BulkPartnerRequestDto } from './dto/create-partner-dto';
import { FindAllOptions } from 'src/shared/entities/enums/find-all-options';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class PartnerRequestController {
  constructor(private readonly partnerRequestService: PartnerRequestService) {}

  @Get()
  async findAll(
    @Query('status') status: string,
    @Query('source') source: string,
    @Query('show') show: FindAllOptions,
  ) {
    return await this.partnerRequestService.findAll(status, source, show);
  }

  @Get('stadistics')
  async stadisticsfindAll(@Query('source') source: string) {
    return await this.partnerRequestService.statisticsPartnerRequest(source);
  }

  @Get('all/:mis')
  async findAllMis(@Query('status') status: string, @Param('mis') mis: string) {
    return await this.partnerRequestService.findAll(status, mis);
  }

  @Get('get/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.partnerRequestService.findOne(id);
  }

  @Post('create')
  @UseGuards(JwtAuthGuard, PermissionGuard)
  async createPartnerRequest(
    @GetUserData() userData: UserData,
    @Body() newPartnerRequest: CreatePartnerRequestDto,
    @Query('mis') mis: string,
  ): Promise<ResponseDto<PartnerRequestDto>> {
    const userDataMis: UserData & { mis: string } = {
      ...userData,
      mis,
    };

    return this.partnerRequestService.createPartnerRequest(
      newPartnerRequest,
      userDataMis,
    );
  }

  @Post('respond')
  @UseGuards(JwtAuthGuard, PermissionGuard)
  async respondPartnerRequest(
    @GetUserData() userData: UserData,
    @Body() respondPartnerRequestDto: RespondRequestDto,
  ): Promise<PartnerRequestDto> {
    return this.partnerRequestService.respondPartnerRequest(
      respondPartnerRequestDto,
      userData,
    );
  }

  @Patch('update')
  @UseGuards(JwtAuthGuard, PermissionGuard)
  async updatePartnerRequest(
    @GetUserData() userData: UserData,
    @Body() updatePartnerRequest: UpdatePartnerRequestDto,
  ): Promise<ResponseDto<PartnerRequestDto>> {
    return this.partnerRequestService.updatePartnerRequest(
      updatePartnerRequest,
      userData,
    );
  }

  @Post('create-bulk')
  @UseGuards(JwtAuthGuard, PermissionGuard)
  async createBulk(@Body() createBulkPartner: BulkPartnerRequestDto) {
    const result: any =
      await this.partnerRequestService.createBulk(createBulkPartner);
    return result;
  }
}
