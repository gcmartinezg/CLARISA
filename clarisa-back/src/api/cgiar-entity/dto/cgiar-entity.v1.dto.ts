import { ApiProperty } from '@nestjs/swagger';
import { BasicDto } from '../../../shared/entities/dtos/basic-dto';

export class CgiarEntityDtoV1 extends BasicDto {
  @ApiProperty({
    description: 'The acronym of the CGIAR entity',
    type: String,
  })
  acronym: string;

  @ApiProperty({
    description: 'The financial code of the CGIAR entity',
    type: String,
  })
  financial_code: string;

  @ApiProperty({
    description: 'The id of the institution linked to the CGIAR entity',
    minimum: 1,
    type: Number,
  })
  institutionId: number;

  @ApiProperty({
    description: 'The type of the CGIAR entity',
    type: BasicDto,
  })
  cgiarEntityTypeDTO: BasicDto;
}
