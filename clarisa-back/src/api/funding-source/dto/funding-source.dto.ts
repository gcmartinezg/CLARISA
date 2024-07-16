import { BasicDtoV2 } from '../../../shared/entities/dtos/basic.v2.dto';

export class FundingSourceDto extends BasicDtoV2 {
  type_term: string;
  funding_to: string;
}
