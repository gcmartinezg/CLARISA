import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
  Query,
  ParseIntPipe,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { CountryOfficeRequestService } from './country-office-request.service';
import { CountryOfficeRequestDto } from './dto/country-office-request.dto';
import { CreateCountryOfficeRequestDto } from './dto/create-country-office-request.dto';
import { RespondRequestDto } from '../../shared/entities/dtos/respond-request.dto';
import { UpdateCountryOfficeRequestDto } from './dto/update-country-office-request.dto';
import { GetUserData } from '../../shared/decorators/user-data.decorator';
import { ResponseDto } from '../../shared/entities/dtos/response.dto';
import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';
import { PermissionGuard } from '../../shared/guards/permission.guard';
import { UserData } from '../../shared/interfaces/user-data';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class CountryOfficeRequestController {
  constructor(
    private readonly countryOfficeRequestService: CountryOfficeRequestService,
  ) {}

  @Get()
  async findAll(
    @Query('status') status: string,
    @Query('source') source: string,
  ) {
    return await this.countryOfficeRequestService.findAll(status, source);
  }

  @Get('get/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.countryOfficeRequestService.findOne(id);
  }

  @Post('create')
  @UseGuards(JwtAuthGuard, PermissionGuard)
  async createCountryOfficeRequests(
    @GetUserData() userData: UserData,
    @Body() newCountryOfficeRequest: CreateCountryOfficeRequestDto,
    @Query('mis') mis: string,
  ): Promise<ResponseDto<CountryOfficeRequestDto[]>> {
    const userDataMis: UserData & { mis: string } = {
      ...userData,
      mis,
    };

    return this.countryOfficeRequestService.createCountryOfficeRequest(
      newCountryOfficeRequest,
      userDataMis,
    );
  }

  @Post('respond')
  @UseGuards(JwtAuthGuard, PermissionGuard)
  async respondCountryOfficeRequest(
    @GetUserData() userData: UserData,
    @Body() respondCountryOfficeRequestDto: RespondRequestDto,
  ): Promise<CountryOfficeRequestDto> {
    return this.countryOfficeRequestService.respondCountryOfficeRequest(
      respondCountryOfficeRequestDto,
      userData,
    );
  }

  @Patch('update')
  @UseGuards(JwtAuthGuard, PermissionGuard)
  async updateCountryOfficeRequest(
    @GetUserData() userData: UserData,
    @Body() updateCountryOfficeRequest: UpdateCountryOfficeRequestDto,
  ): Promise<ResponseDto<CountryOfficeRequestDto>> {
    return this.countryOfficeRequestService.updateCountryOfficeRequest(
      updateCountryOfficeRequest,
      userData,
    );
  }
}
