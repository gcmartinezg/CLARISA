import { ApiProperty } from '@nestjs/swagger';

export class GeopositionDto {
  @ApiProperty({
    description: 'The latitude of the geo-object',
    type: Number,
  })
  latitude: number;

  @ApiProperty({
    description: 'The longitude of the geo-object',
    type: Number,
  })
  longitude: number;
}
