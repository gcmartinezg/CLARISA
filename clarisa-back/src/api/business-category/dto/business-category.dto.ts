import { ApiProperty } from '@nestjs/swagger';

export class BusinessCategoryDto {
  @ApiProperty({
    description: 'The id of the business category',
    minimum: 1,
    type: Number,
  })
  id: number;

  @ApiProperty({
    description: 'The name of the business category',
    type: String,
  })
  name: string;
}
