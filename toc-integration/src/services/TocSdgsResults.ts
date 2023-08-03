
import { ValidatorTypes } from "../validators/validatorType";
import { ErrorValidators } from "../validators/errorsValidators";
import { CreateSdgResultsDto } from "../dto/tocSdgResults";
import { TocSdgResultsSdgTargetsDto } from "../dto/tocSdgResultsSdgTargets";
import { TocSdgResultsSdgIndicatorsDto } from "../dto/tocSdgResultsSdgIndicators";

export class SdgResults {
    public validatorType = new ValidatorTypes();
  public errorMessage = new ErrorValidators();
    async saveSdgResults(sdgResults: any) {
        let listValidSdgResults = [];
        let listNotValidSdgResults = [];
        if (this.validatorType.validatorIsArray(sdgResults)) {
          sdgResults.forEach(async (element) => {
            if (
              this.validatorType.existPropertyInObjectMul(sdgResults, [
                "sdg_id",
                "toc_result_id",
                "sdg_contribution",
                "sdg_targets",
                "sdg_indicators",
              ])
            ) {
              const sdgResultsDto = new CreateSdgResultsDto();
              sdgResultsDto.sdg_id =
                typeof element.sdg_id == "number" ? element.sdg_id : null;
              sdgResultsDto.toc_result_id =
                typeof element.toc_result_id == "string"
                  ? element.toc_result_id
                  : null;
              sdgResultsDto.sdg_contribution =
                typeof element.sdg_contribution == "string"
                  ? element.sdg_contribution
                  : null;
              sdgResultsDto.is_active = true;
              this.validatorType.deletebyAllRelationSdgs(element.toc_result_id);
              if (this.validatorType.validExistNull(sdgResultsDto)) {
                const relationSdg = await this.saveRelationSdgResults(
                  element,
                  element.toc_result_id
                );
                if (typeof relationSdg == "object") {
                  listValidSdgResults.push({
                    sdg_results: sdgResultsDto,
                    relation: relationSdg,
                  });
                } else {
                  return this.errorMessage.errorGeneral(
                    "Exist type incorrect",
                    400
                  );
                }
              } else {
                listNotValidSdgResults.push(element);
              }
            }
          });
        } else {
          return this.errorMessage.errorGeneral("Expected Array ", 400);
        }
        return listValidSdgResults;
      }
    
      async saveRelationSdgResults(objectRelacion: any, toc_results_id: string) {
        let listValidSdgTarget = [];
        let listValidSdgIndicator = [];
        if (this.validatorType.validatorIsArray(objectRelacion.sdg_targets)) {
          objectRelacion.sdg_targets.forEach((element) => {
            if (
              this.validatorType.existPropertyInObjectMul(element, [
                "sdg_target_id",
                "active",
              ])
            ) {
              const relacionSdgTarget = new TocSdgResultsSdgTargetsDto();
              relacionSdgTarget.sdg_target_id =
                typeof element.sdg_target_id == "number"
                  ? element.sdg_target_id
                  : null;
              relacionSdgTarget.is_active =
                typeof element.active == "boolean" ? element.active : null;
              relacionSdgTarget.sdg_toc_result_id = toc_results_id;
              if (this.validatorType.validExistNull(relacionSdgTarget)) {
                listValidSdgTarget.push(relacionSdgTarget);
              } else {
                return false;
              }
            }
          });
        }
        if (this.validatorType.validatorIsArray(objectRelacion.sdg_indicators)) {
          objectRelacion.sdg_indicators.forEach((element) => {
            if (
              this.validatorType.existPropertyInObjectMul(element, [
                "sdg_indicator_id",
              ])
            ) {
              const relacionSdgIndicator = new TocSdgResultsSdgIndicatorsDto();
              relacionSdgIndicator.sdg_indicator_id =
                typeof element.sdg_indicator_id == "number"
                  ? element.sdg_target_id
                  : null;
              relacionSdgIndicator.sdg_toc_result_id = toc_results_id;
              if (this.validatorType.validExistNull(relacionSdgIndicator)) {
                listValidSdgIndicator.push(relacionSdgIndicator);
              } else {
                return false;
              }
            }
          });
        }
        return {
          sdg_target: listValidSdgTarget,
          sdg_indicator: listValidSdgIndicator,
        };
      }
}