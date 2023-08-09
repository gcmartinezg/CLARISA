
import { ValidatorTypes } from "../validators/validatorType";
import { ErrorValidators } from "../validators/errorsValidators";
import { CreateSdgResultsDto } from "../dto/tocSdgResults";
import { TocSdgResultsSdgTargetsDto } from "../dto/tocSdgResultsSdgTargets";
import { TocSdgResultsSdgIndicatorsDto } from "../dto/tocSdgResultsSdgIndicators";

export class TocSdgsServices {
    public validatorType = new ValidatorTypes()
    public errorMessage = new ErrorValidators();
  async createTocSdgResults(sdgResultToc, initiative_id) {
    try {
        let listValidSdgResults = [];
        let listSdgTargets = [];
        let listIndicator = [];
    if (this.validatorType.validatorIsArray(sdgResultToc)){
        for(let sdgResult of sdgResultToc) {
            if (
                this.validatorType.existPropertyInObjectMul(sdgResult, [
                  "sdg_id",
                  "toc_result_id",
                  "sdg_contribution",
                  "sdg_targets",
                  "sdg_indicators",
                ])){
                    const sdgResultT = new CreateSdgResultsDto();
                    sdgResultT.sdg_id =
            typeof sdgResult.sdg_id == "number"
              ? sdgResult.sdg_id
              : null;
              sdgResultT.toc_result_id =
            typeof sdgResult.toc_result_id == "string"
              ? sdgResult.toc_result_id
              : null;
              sdgResultT.sdg_contribution =
            typeof sdgResult.sdg_contribution == "string"
              ? sdgResult.sdg_contribution
              : null;
            sdgResultT.id_toc_initiative = initiative_id;
            await listValidSdgResults.push(sdgResultT);
            listSdgTargets = listSdgTargets.concat(await this.createTocSdgResultsSdgTargets(sdgResult.sdg_targets, sdgResult.toc_result_id));
            listIndicator = listIndicator.concat(await this.createTocSdgResultsTocSdgIndicators(sdgResult.sdg_indicators, sdgResult.toc_result_id));
                }
        }
    }

    return {
        sdgResults: listValidSdgResults,
        sdgTargets: listSdgTargets,
        sdgIndicators: listIndicator
    }
    } catch (error) {
        throw error;
    }
}


async createTocSdgResultsSdgTargets(sdgTargetsToc, toc_results_id: string) {
    try {
        let sdgTargets:any = [];
        if(this.validatorType.validatorIsArray(sdgTargetsToc)){
            for(let sdgTarget of sdgTargetsToc){
                if (
                    this.validatorType.existPropertyInObjectMul(sdgTarget, [
                        "sdg_target_id",
                    ])){
                        const relacionSdgTarget = new TocSdgResultsSdgTargetsDto();
          relacionSdgTarget.sdg_target_id =
            typeof sdgTarget.sdg_target_id == "number"
              ? sdgTarget.sdg_target_id
              : null;
            relacionSdgTarget.sdg_toc_result_id = toc_results_id;
            await sdgTargets.push(relacionSdgTarget);
                    }
            }
        }
        return sdgTargets;
    } catch (error) {
        throw error;
    }
}

async createTocSdgResultsTocSdgIndicators(sdgIndicatorsToc, toc_results_id: string) {
    try {
        let sdgIndicatorT:any = [];
        if(this.validatorType.validatorIsArray(sdgIndicatorsToc)){
            for(let sdgIndicatorI of sdgIndicatorsToc){
                if (
                    this.validatorType.existPropertyInObjectMul(sdgIndicatorI,  [
                        "sdg_indicator_id",
                      ])){
                        const relacionSdgIndicator = new TocSdgResultsSdgIndicatorsDto();
                        relacionSdgIndicator.sdg_indicator_id =
                            typeof sdgIndicatorI.sdg_indicator_id == "number"
                            ? sdgIndicatorI.sdg_indicator_id
                            : null;
                        relacionSdgIndicator.sdg_toc_result_id = toc_results_id;
                            await sdgIndicatorT.push(sdgIndicatorI);
                    }
            }
        }
        return sdgIndicatorT;
    } catch (error) {
        throw error;
    }
}
}