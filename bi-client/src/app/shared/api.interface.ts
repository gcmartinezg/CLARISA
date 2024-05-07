import { Params } from "@angular/router";

export interface GetBiReports {
  id: number;
  report_name: string;
  report_title: string;
  report_description: null | string;
  report_id: string;
  dataset_id: string;
  group_id: string;
  is_active: boolean;
  has_rls_security: boolean;
  has_full_screen: boolean;
  report_order: number;
  queryParams: Params;
}
