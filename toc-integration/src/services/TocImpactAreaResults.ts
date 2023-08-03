
import { ValidatorTypes } from "../validators/validatorType";
import { ErrorValidators } from "../validators/errorsValidators";

import { TocImpactAreaResultsDto } from "../dto/tocImpactAreaResults";
import { TocImpactAreaResultsGlobalTargetsDto } from "../dto/tocImpactAreaResultsGlobalTargets";
import { TocImpactAreaResultsImpactAreaIndicatorsDto } from "../dto/tocImpactAreaResultsImpactAreaIndicators";
import { TocImpactAreaResultsSdgResultsDto } from "../dto/tocImpactAreaResultsSdgResults";



export class ImpactAreaResults{
    public validatorType = new ValidatorTypes();
    public errorMessage = new ErrorValidators();
    async saveImpactAreaResults(impactAreaResults: any, sdgResults: any) {
        let listValidImpactArea = [];
        if (this.validatorType.validatorIsArray(impactAreaResults)) {
          impactAreaResults.forEach(async (element) => {
            if (
              this.validatorType.existPropertyInObjectMul(element, [
                "toc_result_id",
                "impact_area_id",
                "outcome_statement",
                "global_targets",
                "impact_indicators",
                "sdgs",
              ])
            ) {
              const impactAreadto = new TocImpactAreaResultsDto();
              impactAreadto.impact_area_id =
                typeof element.impact_area_id == "number"
                  ? element.impact_area_id
                  : null;
              impactAreadto.toc_result_id =
                typeof element.toc_result_id == "string"
                  ? element.toc_result_id
                  : null;
              impactAreadto.outcome_statement =
                typeof element.outcome_statement == "string"
                  ? element.outcome_statement
                  : null;
              this.validatorType.deletebyAllRelationImpactAre(
                element.toc_result_id
              );
              if (this.validatorType.validExistNull(impactAreadto)) {
                const relation = await this.saveRelationImpactArea(
                  element,
                  element.toc_result_id,
                  sdgResults
                );
                listValidImpactArea.push({
                  impact_area: impactAreadto,
                  relation: relation,
                });
              }
            }
          });
        }
        return listValidImpactArea;
      }
    
      async saveRelationImpactArea(
        objectImpactArea: any,
        toc_result_id: string,
        sdgResults: any
      ) {
        let listValidGlobalTarget = [];
        let listValidImpactIndicator = [];
        let listValidSdg = [];
        let noDuplicate;
        if (this.validatorType.validatorIsArray(objectImpactArea.global_targets)) {
          objectImpactArea.global_targets.forEach((element) => {
            if (
              this.validatorType.existPropertyInObjectMul(element, [
                "global_target_id",
                "active",
              ])
            ) {
              const relationGlobalTarget =
                new TocImpactAreaResultsGlobalTargetsDto();
              relationGlobalTarget.impact_area_toc_result_id = toc_result_id;
              relationGlobalTarget.global_target_id =
                typeof element.global_target_id == "number"
                  ? element.global_target_id
                  : null;
              relationGlobalTarget.is_active =
                typeof element.active == "boolean" ? element.active : null;
              if (this.validatorType.validExistNull(relationGlobalTarget)) {
                listValidGlobalTarget.push(relationGlobalTarget);
              }
            }
          });
        }
        if (this.validatorType.validatorIsArray(objectImpactArea.sdgs)) {
          noDuplicate = await this.validatorType.deleteRepets(
            objectImpactArea.sdgs[0]
          );
    
          noDuplicate.forEach(async (element) => {
            if (
              this.validatorType.existPropertyInObjectMul(element, [
                "toc_result_id",
                "active",
              ])
            ) {
              const relationSdg = new TocImpactAreaResultsSdgResultsDto();
              relationSdg.impact_area_toc_result_id = toc_result_id;
              relationSdg.sdg_toc_result_id =
                typeof element.toc_result_id == "string" &&
                this.validatorType.validExistId(sdgResults, element.toc_result_id)
                  ? element.toc_result_id
                  : null;
              relationSdg.is_active =
                typeof element.active == "boolean" ? element.active : null;
              if (this.validatorType.validExistNull(relationSdg)) {
                listValidSdg.push(relationSdg);
              }
            }
          });
        }
        if (
          this.validatorType.validatorIsArray(objectImpactArea.impact_indicators)
        ) {
          objectImpactArea.impact_indicators.forEach((element) => {
            if (
              this.validatorType.existPropertyInObjectMul(element, [
                "impact_indicator_id",
                "active",
              ])
            ) {
              const relationImpactIndicator =
                new TocImpactAreaResultsImpactAreaIndicatorsDto();
              relationImpactIndicator.impact_area_toc_result_id = toc_result_id;
              relationImpactIndicator.impact_areas_indicators_id =
                typeof element.impact_indicator_id == "number"
                  ? element.impact_indicator_id
                  : null;
              relationImpactIndicator.is_active =
                typeof element.active == "boolean" ? element.active : null;
              if (this.validatorType.validExistNull(relationImpactIndicator)) {
                listValidImpactIndicator.push(relationImpactIndicator);
              }
            }
          });
        }
    
        return {
          global_target: listValidGlobalTarget,
          impact_indicator: listValidImpactIndicator,
          sdg: listValidSdg,
        };
      }
}