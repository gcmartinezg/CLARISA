
import { ValidatorTypes } from "../validators/validatorType";
import { ErrorValidators } from "../validators/errorsValidators";

import { TocImpactAreaResultsDto } from "../dto/tocImpactAreaResults";
import { TocImpactAreaResultsGlobalTargetsDto } from "../dto/tocImpactAreaResultsGlobalTargets";
import { TocImpactAreaResultsImpactAreaIndicatorsDto } from "../dto/tocImpactAreaResultsImpactAreaIndicators";
import { TocImpactAreaResultsSdgResultsDto } from "../dto/tocImpactAreaResultsSdgResults";



export class TocResultImpactAreaServices{
  public validatorType = new ValidatorTypes();
  public errorMessage = new ErrorValidators();

  async saveImpactAreaTocResult(impactArea: any, initiative_id:any, sdgResults:any){
      try {
          let listImpactAreaResults = [];
          let listGlobalTargets = [];
          let listImpactAreaIndicators = [];
          let listSdgResults = [];
          if (this.validatorType.validatorIsArray(impactArea)){
              for(let impactAreaIndex of impactArea){
                  if (
                      this.validatorType.existPropertyInObjectMul(impactAreaIndex, [
                        "toc_result_id",
                        "impact_area_id",
                        "outcome_statement",
                        "global_targets",
                        "impact_indicators",
                        "sdgs",
                      ])
                    ){
                      const impactAreadto = new TocImpactAreaResultsDto();
                      impactAreadto.impact_area_id =
                        typeof impactAreaIndex.impact_area_id == "number"
                          ? impactAreaIndex.impact_area_id
                          : null;
                      impactAreadto.toc_result_id =
                        typeof impactAreaIndex.toc_result_id == "string"
                          ? impactAreaIndex.toc_result_id
                          : null;
                      impactAreadto.outcome_statement =
                        typeof impactAreaIndex.outcome_statement == "string"
                          ? impactAreaIndex.outcome_statement
                          : null;
                      impactAreadto.id_toc_initiative = initiative_id;
                      listImpactAreaResults.push(impactAreadto);
                      listGlobalTargets = listGlobalTargets.concat(await this.saveGlobalTargetsTocResult(impactAreaIndex.global_targets, impactAreaIndex.toc_result_id));
                      listImpactAreaIndicators = listImpactAreaIndicators.concat(await this.saveImpactAreaIndicatorsTocResult(impactAreaIndex.impact_indicators, impactAreaIndex.toc_result_id));
                     
                      if(impactAreaIndex.sdgs[0].length > 0){
                          
                          
                          listSdgResults = listSdgResults.concat(await this.saveImpactAreaSdgResultsTocResult(impactAreaIndex.sdgs[0], impactAreaIndex.toc_result_id, sdgResults));
                          
                          
                      }
                      }
              }
          }
          return {
              listImpactAreaResults: listImpactAreaResults,
              globalTargets: listGlobalTargets,
              impactAreaIndicators: listImpactAreaIndicators,
              ImpactAreaSdgResult: listSdgResults
          }
      } catch (error) {
          throw error;
      }
  }

  async saveGlobalTargetsTocResult(globalTargets: any, impactAreaResults:any){
      try {
          let listValidGlobalTarget = [];
          if(this.validatorType.validatorIsArray(globalTargets)){
              for(let global of globalTargets){
                  if (
                      this.validatorType.existPropertyInObjectMul(global, [
                        "global_target_id",
                      ])){
                          const relationGlobalTarget =
              new TocImpactAreaResultsGlobalTargetsDto();
            relationGlobalTarget.impact_area_toc_result_id = impactAreaResults;
            relationGlobalTarget.global_target_id =
              typeof global.global_target_id == "number"
                ? global.global_target_id
                : null;
                listValidGlobalTarget.push(relationGlobalTarget);
                      }
                    
              }
          }
          return listValidGlobalTarget;
      } catch (error) {
          throw error;
      }
  }
 

  async saveImpactAreaIndicatorsTocResult(impactAreaIndicators: any, impactAreaResults:any){
      try {
          let listValidImpactAreaIndicators = [];
          if (
              this.validatorType.validatorIsArray(impactAreaIndicators)
            ){
              for(let impactIndicator of impactAreaIndicators){
                  if (
                      this.validatorType.existPropertyInObjectMul(impactIndicator, [
                          "impact_indicator_id",
                      ])
                    ){
                      const relationImpactIndicator =
                      new TocImpactAreaResultsImpactAreaIndicatorsDto();
                    relationImpactIndicator.impact_area_toc_result_id = impactAreaResults;
                    relationImpactIndicator.impact_areas_indicators_id =
                      typeof impactIndicator.impact_indicator_id == "number"
                        ? impactIndicator.impact_indicator_id
                        : null;
                  listValidImpactAreaIndicators.push(relationImpactIndicator);
              }
            }
          }
          return listValidImpactAreaIndicators;
      } catch (error) {
              throw error;
      }
  }


  async saveImpactAreaSdgResultsTocResult(sdgResults: any, impactAreaResults:any, sdgResultsSave:any){
      try {
          let listSdgImpact = [];
          
              if (this.validatorType.validatorIsArray(sdgResults)) {
                  console.log('entre');
                  
                  for(let sdg of sdgResults){
                      console.log('entre2');
                      
                      if (
                          this.validatorType.existPropertyInObjectMul(sdg, [
                            "toc_result_id",
                          ])
                        ) {
                          
                          const relationSdg = new TocImpactAreaResultsSdgResultsDto();
                          console.log(sdgResultsSave);
                relationSdg.impact_area_toc_result_id = impactAreaResults;
                relationSdg.sdg_toc_result_id =
                  typeof sdg.toc_result_id == "string" &&
                  this.validatorType.validExistId(sdgResultsSave, sdg.toc_result_id)
                    ? sdg.toc_result_id
                    : null;
                    
                    listSdgImpact.push(relationSdg);
                    
                        }
                  }
              
          }
          return listSdgImpact;
      } catch (error) {
          throw error;
      }
  }
}