import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Min, ValidateIf } from 'class-validator';

export class RespondRequestDto {
  @ApiProperty({
    description: 'The code of the request to respond',
    type: Number,
    minimum: 1,
  })
  @Min(1)
  requestId: number;

  @ApiProperty({
    description: 'The id of the user responding to the request',
    type: Number,
    minimum: 1,
  })
  @Min(1)
  userId: number;

  @ApiProperty({
    description: 'Is the request being accepted or rejected?',
    type: Boolean,
  })
  @IsNotEmpty()
  accept: boolean;

  @ApiProperty({
    description: 'The accronym of the source responding to the request',
    type: String,
  })
  misAcronym: string;

  @ApiProperty({
    description: 'The justification for the rejection of the request',
    type: String,
  })
  @ValidateIf((o) => !o.accept)
  @IsNotEmpty()
  rejectJustification: string;

  @ApiProperty({
    description: 'The email of the user that created the request',
    type: String,
  })
  @IsEmail()
  externalUserMail: string;

  @ApiProperty({
    description: 'The name of the user that created the request',
    type: String,
  })
  externalUserName: string;

  @ApiProperty({
    description: 'The additional comments of the user that created the request',
    type: String,
  })
  externalUserComments: string;
}
