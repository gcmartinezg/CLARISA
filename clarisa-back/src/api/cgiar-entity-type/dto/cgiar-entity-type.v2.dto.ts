import { ApiProperty } from '@nestjs/swagger';
import { BasicDto } from '../../../shared/entities/dtos/basic-dto';

export class CgiarEntityTypeDtoV2 extends BasicDto {
  @ApiProperty({
    description: 'The prefix of the CGIAR entity',
    type: String,
  })
  prefix: string;

  @ApiProperty({
    description: 'The parent of the CGIAR entity',
    type: BasicDto,
    nullable: true,
  })
  parent: BasicDto;

  @ApiProperty({
    description: 'The definition of the CGIAR entity',
    type: String,
  })
  definition: string;

  @ApiProperty({
    description: 'The level of the CGIAR entity',
    minimum: 1,
    type: Number,
  })
  level: number;

  @ApiProperty({
    description: 'The funding source linked to the CGIAR entity',
    type: BasicDto,
    nullable: true,
  })
  funding_source: BasicDto;

  @ApiProperty({
    description: 'The acronym of the CGIAR entity',
    type: BasicDto,
    nullable: true,
  })
  portfolio: BasicDto;
}
