export class FundingSourceDto {
  id: number;
  name: string;
  description: string;
  type_term: string;
  funding_to: string;
  is_active?: boolean;
}
