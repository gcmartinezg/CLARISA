import { Injectable } from '@nestjs/common';
import { Phase } from '../entities/phase.entity';
import { PhaseDto } from '../dto/phase.dto';

@Injectable()
export class PhaseMapper {
  constructor() {}

  public classToDto(phase: Phase): PhaseDto {
    const phaseDto: PhaseDto = new PhaseDto();

    phaseDto.active = phase.auditableFields?.is_active;
    phaseDto.name = phase.name;
    phaseDto.phaseId = phase.id;
    phaseDto.year = phase.year;
    phaseDto.application = phase['application'];

    return phaseDto;
  }
}
