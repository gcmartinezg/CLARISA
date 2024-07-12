import { ApiProperty } from '@nestjs/swagger';

export class BeneficiaryDto {
  @ApiProperty({
    description: 'The id of the beneficiary',
    minimum: 1,
    type: Number,
  })
  id: number;

  @ApiProperty({
    description: 'The name of the beneficiary',
    type: String,
  })
  name: string;
}
