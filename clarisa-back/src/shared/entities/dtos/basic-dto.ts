import { ApiProperty } from '@nestjs/swagger';

export class BasicDto {
  @ApiProperty({
    description: 'The id of the entity',
    minimum: 1,
    oneOf: [{ type: 'number' }, { type: 'string' }],
  })
  code: string | number;

  @ApiProperty({
    description: 'The name of the entity',
    type: String,
    nullable: true,
  })
  name?: string;

  @ApiProperty({
    description: 'The description of the entity',
    type: String,
    nullable: true,
  })
  description?: string;

  @ApiProperty({
    description: 'Is the entity active?',
    minimum: 1,
    type: Boolean,
    nullable: true,
  })
  is_active?: boolean;
}
