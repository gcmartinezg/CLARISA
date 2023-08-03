
import { ValidatorTypes } from "../validators/validatorType";
import { ErrorValidators } from "../validators/errorsValidators";
import { TocActionAreaResultsDto } from "../dto/tocActionAreaResults";
import { TocActionAreaResultsOutcomesIndicatorsDto } from "../dto/tocActionAreaResultsOutcomesIndicators";
import { TocActionAreaResultsImpactAreaResultsDto } from "../dto/tocActionAreaResultsImpactAreaResults";

export class ActionAreaResults{
    public validatorType = new ValidatorTypes();
    public errorMessage = new ErrorValidators();
    
    async saveActionAreaResult(actionAreaResults: any, impactAreaResulst: any) {
        let listValidActionArea = [];
        if (this.validatorType.validatorIsArray(actionAreaResults)) {
          actionAreaResults.forEach(async (element) => {
            if (
              this.validatorType.existPropertyInObjectMul(element, [
                "toc_result_id",
                "action_area_id",
                "outcome_id",
                "statement",
                "outcome_indicators",
                "impact_areas",
              ])
            ) {
              const actionAreaDto = new TocActionAreaResultsDto();
              actionAreaDto.toc_result_id =
                typeof element.toc_result_id == "string"
                  ? element.toc_result_id
                  : null;
              actionAreaDto.action_areas_id =
                typeof element.action_area_id == "number"
                  ? element.action_area_id
                  : null;
              actionAreaDto.outcome_id =
                typeof element.outcome_id == "number" ? element.outcome_id : null;
              actionAreaDto.statement =
                typeof element.statement == "string" ? element.statement : null;
              actionAreaDto.is_active = true;
              this.validatorType.deletebyAllRelationActionArea(
                element.toc_result_id
              );
              if (this.validatorType.validExistNull(actionAreaDto)) {
                const relation = await this.relationActionAreaResults(
                  element,
                  impactAreaResulst,
                  element.toc_result_id
                );
                listValidActionArea.push({
                  action_area: actionAreaDto,
                  relation: relation,
                });
              }
            }
          });
        }
        return listValidActionArea;
      }
    
      async relationActionAreaResults(
        objectActionArea: any,
        impactAreaResults: any,
        toc_result_id
      ) {
        let listValidOutCome = [];
        let listValidImpactArea = [];
        if (
          this.validatorType.validatorIsArray(objectActionArea.outcome_indicators)
        ) {
          objectActionArea.outcome_indicators.forEach((element) => {
            if (
              this.validatorType.existPropertyInObjectMul(element, [
                "outcome_indicator_id",
                "active",
              ])
            ) {
              const relationOutCome =
                new TocActionAreaResultsOutcomesIndicatorsDto();
              relationOutCome.action_area_toc_result_id = toc_result_id;
              relationOutCome.action_area_outcome_indicator_id =
                typeof element.outcome_indicator_id == "number"
                  ? element.outcome_indicator_id
                  : null;
              relationOutCome.is_active =
                typeof element.active == "boolean" ? element.active : null;
              if (this.validatorType.validExistNull(relationOutCome)) {
                listValidOutCome.push(relationOutCome);
              }
            }
          });
        }
        if (this.validatorType.validatorIsArray(objectActionArea.impact_areas)) {
          objectActionArea.impact_areas.forEach((element) => {
            if (
              this.validatorType.existPropertyInObjectMul(element, [
                "toc_result_id",
                "active",
              ])
            ) {
              const relationImpactArea =
                new TocActionAreaResultsImpactAreaResultsDto();
              relationImpactArea.action_area_toc_result_id = toc_result_id;
              relationImpactArea.impact_area_toc_result_id =
                typeof element.toc_result_id == "string" &&
                this.validatorType.validExistIdImpact(
                  impactAreaResults,
                  element.toc_result_id
                )
                  ? element.toc_result_id
                  : null;
              relationImpactArea.is_active =
                typeof element.active == "boolean" ? element.active : null;
              if (this.validatorType.validExistNull(relationImpactArea)) {
                listValidImpactArea.push(relationImpactArea);
              }
            }
          });
        }
    
        return { outcome: listValidOutCome, impact_area: listValidImpactArea };
      }
}