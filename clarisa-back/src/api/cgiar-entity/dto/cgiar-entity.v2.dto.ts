import { ApiProperty } from '@nestjs/swagger';
import { BasicDto } from '../../../shared/entities/dtos/basic-dto';

export class CgiarEntityDtoV2 extends BasicDto {
  @ApiProperty({
    description: 'The short name of the CGIAR entity',
    type: String,
  })
  short_name: string;

  @ApiProperty({
    description: 'The acronym of the CGIAR entity',
    type: String,
  })
  acronym: string;

  @ApiProperty({
    description: 'The type of the CGIAR entity',
    type: BasicDto,
  })
  entity_type: BasicDto;

  @ApiProperty({
    description: 'The parent of the CGIAR entity',
    type: BasicDto,
    nullable: true,
  })
  parent: BasicDto;

  @ApiProperty({
    description: 'The portfolio linked to the CGIAR entity',
    type: BasicDto,
  })
  portfolio: BasicDto;

  @ApiProperty({
    description: 'The start date of the CGIAR entity',
    type: String,
  })
  start_date: string;

  @ApiProperty({
    description: 'The end date of the CGIAR entity',
    type: String,
  })
  end_date: string;

  @ApiProperty({
    description: 'The level of the CGIAR entity',
    minimum: 1,
    type: Number,
  })
  level: number;
}
