
import { ValidatorTypes } from "../validators/validatorType";
import { ErrorValidators } from "../validators/errorsValidators";
import { TocActionAreaResultsDto } from "../dto/tocActionAreaResults";
import { TocActionAreaResultsOutcomesIndicatorsDto } from "../dto/tocActionAreaResultsOutcomesIndicators";
import { TocActionAreaResultsImpactAreaResultsDto } from "../dto/tocActionAreaResultsImpactAreaResults";

export class ActionAreaTocServices{
  public validatorType = new ValidatorTypes();
  public errorMessage = new ErrorValidators();

  async saveActionAreaToc(actionAreaToc: any, id_toc_initiative: string, imapctAreaToc:any){

      try {
          let listActionAreaToc = [];
          let listOutcomeIndicators = [];
          let listImpactAreaToc = [];
          if (this.validatorType.validatorIsArray(actionAreaToc)){
              for(let actionArea of actionAreaToc){
                  if (
                      this.validatorType.existPropertyInObjectMul(actionArea, [
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
                        typeof actionArea.toc_result_id == "string"
                          ? actionArea.toc_result_id
                          : null;
                      actionAreaDto.action_areas_id =
                        typeof actionArea.action_area_id == "number"
                          ? actionArea.action_area_id
                          : null;
                      actionAreaDto.outcome_id =
                        typeof actionArea.outcome_id == "number" ? actionArea.outcome_id : null;
                      actionAreaDto.statement =
                        typeof actionArea.statement == "string" ? actionArea.statement : null;
                      actionAreaDto.id_toc_initiative= id_toc_initiative;
                      listActionAreaToc.push(actionAreaDto);
                      listOutcomeIndicators = listOutcomeIndicators.concat(await this.saveActionAreaTocOutcomesIndicators(actionArea.outcome_indicators, actionArea.toc_result_id));
                      listImpactAreaToc = listImpactAreaToc.concat(await this.saveImpactAreaToc(actionArea.impact_areas, actionArea.toc_result_id, imapctAreaToc));    
                  }
              }
          }
          return {
              actionAreaToc: listActionAreaToc,
              outcomeIndicators: listOutcomeIndicators,
              impactAreaToc: listImpactAreaToc
          };
      } catch (error) {
          throw error;
      }

  }


  async saveActionAreaTocOutcomesIndicators(actionAreaTocOutcome: any, id_toc: string){
      try {
          let listOutcomesIndicators = [];
          if (
              this.validatorType.validatorIsArray(actionAreaTocOutcome)
            ){
              for(let outcome of actionAreaTocOutcome){
                  if (
                      this.validatorType.existPropertyInObjectMul(outcome, [
                        "outcome_indicator_id",
                      ])
                    ){
                      const relationOutCome =
                      new TocActionAreaResultsOutcomesIndicatorsDto();
                    relationOutCome.action_area_toc_result_id = id_toc;
                    relationOutCome.action_area_outcome_indicator_id =
                      typeof outcome.outcome_indicator_id == "number"
                        ? outcome.outcome_indicator_id
                        : null;
                        listOutcomesIndicators.push(relationOutCome);
                    }
              }
            }
            return listOutcomesIndicators;
      } catch (error) {
          throw error;
      }
  }

  async saveImpactAreaToc(impactAreaToc: any, id_toc: string, impactSave:any){
      try {
          let listImpactAction = [];
          if(this.validatorType.validatorIsArray(impactAreaToc)) {
              for(let impactsAction of impactAreaToc){
                  if (
                      this.validatorType.existPropertyInObjectMul(impactsAction, [
                        "toc_result_id",
                      ])
                    ){
                              const relationImpactArea =
                  new TocActionAreaResultsImpactAreaResultsDto();
              relationImpactArea.action_area_toc_result_id = id_toc;
              relationImpactArea.impact_area_toc_result_id =
                  typeof impactsAction.toc_result_id == "string" &&
                  this.validatorType.validExistIdImpact(
                      impactSave,
                  impactsAction.toc_result_id
                  )
                  ? impactsAction.toc_result_id
                  : null;

                  listImpactAction.push(relationImpactArea);
              }
              }
          }
          return listImpactAction;
      } catch (error) {
          throw error;
      }
  }
}