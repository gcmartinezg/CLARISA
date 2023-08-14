import { Injectable } from '@nestjs/common';
import { PhaseRepository } from './repositories/phase.repository';
import { FindAllOptions } from '../../shared/entities/enums/find-all-options';
import { Phase } from './entities/phase.entity';
import { PhaseStatus } from '../../shared/entities/enums/phase-status';
import { PhaseDto } from './dto/phase.dto';
import { PhaseMapper } from './mappers/phase.mapper';
import { PRMSApplication } from '../../shared/entities/enums/prms-applications';

@Injectable()
export class PhaseService {
  constructor(
    private _phaseRepository: PhaseRepository,
    private _phaseMapper: PhaseMapper,
  ) {}

  async findAll(
    show: FindAllOptions = FindAllOptions.SHOW_ONLY_ACTIVE,
    status: string = PhaseStatus.SHOW_ONLY_OPEN.path,
  ): Promise<PhaseDto[]> {
    if (!PhaseStatus.getfromPath(status)) {
      throw Error('?!');
    }

    const phases: Phase[] = await this._phaseRepository.findAllPhases(
      status,
      show,
      PRMSApplication.ALL.simpleName,
    );
    const phaseDtos: PhaseDto[] = phases.map((p) =>
      this._phaseMapper.classToDto(p),
    );

    return phaseDtos;
  }

  async findAllByApplication(
    application: string,
    show: FindAllOptions = FindAllOptions.SHOW_ONLY_ACTIVE,
    status: string = PhaseStatus.SHOW_ONLY_OPEN.path,
  ): Promise<PhaseDto[]> {
    if (!PhaseStatus.getfromPath(status)) {
      throw Error('?!');
    }

    if (!PRMSApplication.getfromSimpleName(application)) {
      throw Error('?!');
    }

    const phases: Phase[] = await this._phaseRepository.findAllPhases(
      status,
      show,
      application,
    );

    const phaseDtos: PhaseDto[] = phases.map((p) =>
      this._phaseMapper.classToDto(p),
    );

    return phaseDtos;
  }
}
