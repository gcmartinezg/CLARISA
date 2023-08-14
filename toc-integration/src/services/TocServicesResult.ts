import { Connection } from "typeorm";
import { Database } from "../database/db";
import { ValidatorTypes } from "../validators/validatorType";
import { ErrorValidators } from "../validators/errorsValidators";
import { CreateSdgResultsDto } from "../dto/tocSdgResults";
import { TocSdgResultsSdgTargetsDto } from "../dto/tocSdgResultsSdgTargets";
import { TocSdgResultsSdgIndicatorsDto } from "../dto/tocSdgResultsSdgIndicators";
import { TocImpactAreaResultsDto } from "../dto/tocImpactAreaResults";
import { TocImpactAreaResultsGlobalTargetsDto } from "../dto/tocImpactAreaResultsGlobalTargets";
import { TocImpactAreaResultsImpactAreaIndicatorsDto } from "../dto/tocImpactAreaResultsImpactAreaIndicators";
import { TocImpactAreaResultsSdgResultsDto } from "../dto/tocImpactAreaResultsSdgResults";
import { TocActionAreaResultsDto } from "../dto/tocActionAreaResults";
import { TocActionAreaResultsOutcomesIndicatorsDto } from "../dto/tocActionAreaResultsOutcomesIndicators";
import { TocActionAreaResultsImpactAreaResultsDto } from "../dto/tocActionAreaResultsImpactAreaResults";
import { TocResultsDto } from "../dto/tocResults";
import { TocResultsActionAreaResultsDto } from "../dto/tocResultsActionAreaResults";
import { TocResultsImpactAreaResultsDto } from "../dto/tocResultsImpactAreaResults";
import { TocResultsSdgResultsDto } from "../dto/tocResultsSdgResults";
import { TocSdgResultsSdgTargets } from "../entities/tocSdgResultsSdgTargets";
import { TocResultsIndicatorsDto } from "../dto/tocResultsIndicators";
import { TocResultsRegionsDto } from "../dto/tocResultsRegions";
import { TocResultsCountriesDto } from "../dto/tocResultsCountries";
import { TocResults } from "../entities/tocResults";
import { TocImpactAreaResults } from "../entities/tocImpactAreaResults";
import { TocActionAreaResults } from "../entities/tocActionAreaResults";
import { TocSdgResults } from "../entities/tocSdgResults";
import { TocSdgResultsSdgIndicators } from "../entities/tocSdgResultsSdgIndicators";
import { TocImpactAreaResultsGlobalTargets } from "../entities/tocImpactAreaResultsGlobalTargets";
import { TocImpactAreaResultsImpactAreaIndicators } from "../entities/tocImpactAreaResultsImpactAreaIndicators";
import { TocImpactAreaResultsSdgResults } from "../entities/tocImpactAreaResultsSdgResults";
import { TocActionAreaResultsOutcomesIndicators } from "../entities/tocActionAreaResultsOutcomesIndicators";
import { TocActionAreaResultsImpactAreaResults } from "../entities/tocActionAreaResultsImpactAreaResults";
import { TocResultsActionAreaResults } from "../entities/tocResultsActionAreaResults";
import { TocResultsImpactAreaResults } from "../entities/tocResultsImpactAreaResults";
import { TocResultsSdgResults } from "../entities/tocResultsSdgResults";
import { TocResultsIndicators } from "../entities/tocResultsIndicators";
import { TocResultsCountries } from "../entities/tocResultsCountries";
import { TocResultsRegions } from "../entities/tocResultsRegions";

import { SdgTarget } from "../entities/sdg_target";
import axios from "axios";
import { TocSdgsServices } from "./TocSdgsResults";
import { TocResultImpactAreaServices } from "./TocImpactAreaResults";
import { ActionAreaTocServices } from "./TocActionAreaResults";

export class TocServicesResults {
  public validatorType = new ValidatorTypes();
  public errorMessage = new ErrorValidators();
  public tocSdgResults = new TocSdgsServices();
  public tocImpactAreas = new TocResultImpactAreaServices();
  public actionAreaToc = new ActionAreaTocServices();
  
  async queryTest() {
    let database = new Database();
    let dbConn: Connection = await database.getConnection();

    try {
      const queryRunner = dbConn.createQueryRunner();
      await queryRunner.connect();

      const getInitiatives = await queryRunner.query(`
      SELECT * FROM toc_results

      `);

      await queryRunner.release();

      return { getInitiatives };
    } catch (error) {
      return { message: "getInitiatives" + error };
    }
  }

  async entitiesTest(){

    let database = new Database();
    let dbConn: Connection = await database.getConnection();
    let iniciativeRepo = dbConn.getRepository(SdgTarget)
    try {
      let getInitiatives = await iniciativeRepo.find()

      return { getInitiatives };
    } catch (error) {
      return { message: "getInitiatives" + error };
    }
  }
 
  async splitInformation(idInitiativeToc:string){
    let tocHost = await 'https://toc.loc.codeobia.com/api/toc/'+idInitiativeToc+'/dashboard-result';

    try {
        const narrative =  await axios({
            method: 'get',
            url: tocHost,
            timeout: 20000 // only wait for 2s
        });
        let InformationSaving = null
        if( this.validatorType.existPropertyInObjectMul(narrative.data, [
            "sdg_results",
            "impact_area_results",
            "action_area_results",
            "output_outcome_results",
          ])){
            let sdgTocResults = await this.tocSdgResults.createTocSdgResults(narrative.data.sdg_results, idInitiativeToc);
            let impactAreaTocResults = await this.tocImpactAreas.saveImpactAreaTocResult(narrative.data.impact_area_results, idInitiativeToc, sdgTocResults.sdgResults);
            let actionAreaResults = await this.actionAreaToc.saveActionAreaToc(narrative.data.action_area_results, idInitiativeToc, impactAreaTocResults.listImpactAreaResults)
            InformationSaving = {... sdgTocResults, ...impactAreaTocResults, ...actionAreaResults}
        }

        return InformationSaving;
    } catch (error) {
        throw new Error(error);
    }
    
    
    
}

  


  //mapping action areas results


  //mapping output_outcome_results

  async saveOutputOutcomeResults(
    outputOutcomeResults: any,
    sdgResults: any,
    impactAreaResults: any,
    actionAreaResult: any,
    id_toc_initiative: string
  ) {
    let listValidTocResult = [];
    if (this.validatorType.validatorIsArray(outputOutcomeResults)) {
      let con = 0;

      outputOutcomeResults.forEach(async (element) => {
        if (
          this.validatorType.existPropertyInObjectMul(element, [
            "toc_result_id",
            "result_type",
            "wp_id",
            "result_title",
            "result_description",
            "outcome_type",
            "indicators",
            "action_areas",
            "impact_areas",
            "sdgs",
            "geo_scope",
          ])
        ) {
          const outPutComeDto = new TocResultsDto();
          outPutComeDto.toc_result_id =
            typeof element.toc_result_id == "string"
              ? element.toc_result_id
              : null;
          outPutComeDto.result_type =
            typeof element.result_type == "number" ? element.result_type : null;
          outPutComeDto.work_packages_id =
            typeof element.wp_id == "number" ? element.wp_id : null;
          outPutComeDto.result_title =
            typeof element.result_title == "string"
              ? element.result_title
              : null;
          outPutComeDto.result_description =
            typeof element.result_description == "string"
              ? element.result_description
              : null;
          outPutComeDto.outcome_type =
            typeof element.outcome_type == "string"
              ? element.outcome_type
              : null;
          outPutComeDto.is_active = true;
          outPutComeDto.is_global = true;
          outPutComeDto.id_toc_initiative = id_toc_initiative;
          //this.validatorType.deletebyAllRelationOutcome(element.toc_result_id);
          const relation = await this.relationTocResults(
            element,
            element.toc_result_id,
            sdgResults,
            impactAreaResults,
            actionAreaResult
          );
          listValidTocResult.push({
            outcome: outPutComeDto,
            relation: relation,
          });
        }
      });
    }
    return listValidTocResult;
  }

  async relationTocResults(
    outputOutcomeResults: any,
    toc_results_id: string,
    sdgResults: any,
    impactAreaResults: any,
    actionAreaResult: any
  ) {
    let listValidActionArea = [];
    let listValidSdg = [];
    let listValidImpact = [];
    let listValidIndicator = [];
    let listValidRegions = [];
    let listValidCountry = [];
    if (
      this.validatorType.validatorIsArray(outputOutcomeResults.action_areas)
    ) {
      outputOutcomeResults.action_areas.forEach((element) => {
        if (
          this.validatorType.existPropertyInObjectMul(element, [
            "toc_result_id",
            "active",
          ])
        ) {
          const tocResultAction = new TocResultsActionAreaResultsDto();
          tocResultAction.toc_result_id = toc_results_id;
          tocResultAction.action_area_toc_result_id =
            typeof element.toc_result_id == "string" &&
            this.validatorType.validExistIdAction(
              actionAreaResult,
              element.toc_result_id
            )
              ? element.toc_result_id
              : null;
          //tocResultAction.is_active = typeof element.active == 'boolean'? element.active : null;
          if (this.validatorType.validExistNull(tocResultAction)) {
            listValidActionArea.push(tocResultAction);
          }
        }
      });
    }
    if (
      this.validatorType.validatorIsArray(outputOutcomeResults.impact_areas)
    ) {
      outputOutcomeResults.impact_areas.forEach((element) => {
        if (
          this.validatorType.existPropertyInObjectMul(element, [
            "toc_result_id",
            "active",
          ])
        ) {
          const tocResultImpact = new TocResultsImpactAreaResultsDto();
          tocResultImpact.toc_result_id = toc_results_id;
          tocResultImpact.impact_area_toc_result_id =
            typeof element.toc_result_id == "string" &&
            this.validatorType.validExistIdImpact(
              impactAreaResults,
              element.toc_result_id
            )
              ? element.toc_result_id
              : null;
          tocResultImpact.is_active =
            typeof element.active == "boolean" ? element.active : null;
          if (this.validatorType.validExistNull(tocResultImpact)) {
            listValidImpact.push(tocResultImpact);
          }
        }
      });
    }
    if (this.validatorType.validatorIsArray(outputOutcomeResults.sdgs)) {
      outputOutcomeResults.sdgs.forEach((element) => {
        if (
          this.validatorType.existPropertyInObjectMul(element, [
            "toc_result_id",
            "active",
          ])
        ) {
          const tocResultSdg = new TocResultsSdgResultsDto();
          tocResultSdg.toc_result_id = toc_results_id;
          tocResultSdg.sdg_toc_result_id =
            typeof element.toc_result_id == "string" &&
            this.validatorType.validExistId(sdgResults, element.toc_result_id)
              ? element.toc_result_id
              : null;
          tocResultSdg.is_active =
            typeof element.active == "boolean" ? element.active : null;
          if (this.validatorType.validExistNull(tocResultSdg)) {
            listValidSdg.push(tocResultSdg);
          }
        }
      });
    }
    if (this.validatorType.validatorIsArray(outputOutcomeResults.indicators)) {
      outputOutcomeResults.indicators.forEach((element) => {
        if (
          this.validatorType.existPropertyInObjectMul(element, [
            "unit_of_measurement",
            "description",
            "location",
            "data_collection_source",
            "baseline",
            "id",
            "type",
            "data_collection_frequency",
            "data_collection_method",
            "target",
          ])
        ) {
          const tocResultIndicator = new TocResultsIndicatorsDto();
          tocResultIndicator.toc_result_indicator_id =
            typeof element.id == "string" ? element.id : null;
          tocResultIndicator.toc_result_id = toc_results_id;
          tocResultIndicator.indicator_description =
            typeof element.description == "string" ? element.description : null;
          tocResultIndicator.unit_messurament =
            typeof element.unit_of_measurement == "string"
              ? element.unit_of_measurement
              : null;
          tocResultIndicator.baseline_date =
            typeof element.baseline.date == "string"
              ? element.baseline.date
              : null;
          tocResultIndicator.baseline_value =
            typeof element.baseline.value == "string"
              ? element.baseline.value
              : null;
          tocResultIndicator.data_collection_method =
            typeof element.data_collection_method == "string"
              ? element.data_collection_method
              : null;
          tocResultIndicator.data_colletion_source =
            typeof element.data_collection_source == "string"
              ? element.data_collection_source
              : null;
          tocResultIndicator.frequency_data_collection =
            typeof element.data_collection_frequency == "string"
              ? element.data_collection_frequency
              : null;
          tocResultIndicator.type_value =
            typeof element.type.name == "string" ? element.location : null;
          tocResultIndicator.location =
            typeof element.location == "string" ? element.location : null;
          tocResultIndicator.target_date =
            typeof element.target.date == "string" ? element.target.date : null;
          tocResultIndicator.target_value =
            typeof element.target.value == "string"
              ? element.target.value
              : null;
          tocResultIndicator.is_active = true;
          if (
            this.validatorType.existPropertyInObjectMul(element, [
              "country",
              "region",
            ])
          ) {
            let countries = "";
            let regions = "";
            if (this.validatorType.validatorIsArray(element.country)) {
              element.country.forEach((elements) => {
                countries += elements.code + ",";
              });
              tocResultIndicator.countries_id = countries;
            }
            if (this.validatorType.validatorIsArray(element.region)) {
              element.region.forEach((elements) => {
                regions += elements.um49Code + ",";
              });
              tocResultIndicator.regions_id = regions;
            }
          }
          listValidIndicator.push(tocResultIndicator);
        }
      });
    }
    if (
      this.validatorType.existPropertyInObject(
        outputOutcomeResults,
        "geo_scope"
      )
    ) {
      if (
        this.validatorType.validatorIsObject(outputOutcomeResults.geo_scope) &&
        this.validatorType.validatorIsArray(outputOutcomeResults.geo_scope) ==
          false
      ) {
        if (
          this.validatorType.validatorIsArray(
            outputOutcomeResults.geo_scope.regions
          )
        ) {
          outputOutcomeResults.geo_scope.regions.forEach((element) => {
            if (
              this.validatorType.existPropertyInObjectMul(element, [
                "region_id",
                "active",
              ])
            ) {
              const tocResultRegions = new TocResultsRegionsDto();
              tocResultRegions.toc_result_id = toc_results_id;
              tocResultRegions.clarisa_regions_id =
                typeof element.region_id == "number" ? element.region_id : null;
              tocResultRegions.is_active =
                typeof element.active == "boolean" ? element.active : null;
              if (this.validatorType.validExistNull(tocResultRegions)) {
                listValidRegions.push(tocResultRegions);
              }
            }
          });
        }
        if (
          this.validatorType.validatorIsArray(
            outputOutcomeResults.geo_scope.countries
          )
        ) {
          outputOutcomeResults.geo_scope.countries.forEach((element) => {
            if (
              this.validatorType.existPropertyInObjectMul(element, [
                "country_id",
                "active",
              ])
            ) {
              const tocResultcountries = new TocResultsCountriesDto();
              tocResultcountries.toc_result_id = toc_results_id;
              tocResultcountries.clarisa_countries_id =
                typeof element.country_id == "number"
                  ? element.country_id
                  : null;
              tocResultcountries.is_active =
                typeof element.active == "boolean" ? element.active : null;
              if (this.validatorType.validExistNull(tocResultcountries)) {
                listValidCountry.push(tocResultcountries);
              }
            }
          });
        }
      }
    }

    return {
      action_area: listValidActionArea,
      impact_area: listValidImpact,
      sdg: listValidSdg,
      indicator: listValidIndicator,
      regions: listValidRegions,
      countries: listValidCountry,
    };
  }

  //save in data base
  async mappingSaveDb(
    outputOutcomeResults: any,
    sdgResults: any,
    impactAreaResults: any,
    actionAreaResult: any
  ) {
    let listRegisterSdg = [];
    let listAllSdgTarget = [];
    let listAllSdgindicators = [];
    let listAllActionAreaToc = [];
    let listRegisterOutcome = [];
    let listAllImpactAreaToc = [];
    let listAllRegions = [];
    let lisAllCountries = [];
    let listAllSdgtoc = [];
    let listRegisterImpact = [];
    let listAllGlobalTargets = [];
    let listAllSgds = [];
    let listAllImpactAreaIndicator = [];
    let listAllOutCome = [];
    let listAllImpact = [];
    let listRegisterAction = [];
    let listAllIndicators = [];
    await sdgResults.forEach(async (element) => {
      listRegisterSdg.push(element.sdg_results);

      await element.relation.sdg_target.forEach((elements) => {
        listAllSdgTarget.push(elements);
      });
      await element.relation.sdg_indicator.forEach((elements) => {
        listAllSdgindicators.push(elements);
      });
    });

    await outputOutcomeResults.forEach(async (element) => {
      listRegisterOutcome.push(element.outcome);
      await element.relation.action_area.forEach((elements) => {
        listAllActionAreaToc.push(elements);
      });
      await element.relation.impact_area.forEach((elements) => {
        listAllImpactAreaToc.push(elements);
      });
      await element.relation.regions.forEach((elements) => {
        listAllRegions.push(elements);
      });
      await element.relation.countries.forEach((elements) => {
        lisAllCountries.push(elements);
      });
      await element.relation.sdg.forEach((elements) => {
        listAllSdgtoc.push(elements);
      });

      await element.relation.indicator.forEach((elements) => {
        listAllIndicators.push(elements);
      });
    });

    await impactAreaResults.forEach(async (element) => {
      listRegisterImpact.push(element.impact_area);
      await element.relation.global_target.forEach((element) => {
        listAllGlobalTargets.push(element);
      });
      await element.relation.impact_indicator.forEach((element) => {
        listAllImpactAreaIndicator.push(element);
      });

      await element.relation.sdg.forEach((element) => {
        listAllSgds.push(element);
      });
    });

    await actionAreaResult.forEach(async (element) => {
      listRegisterAction.push(element.action_area);
      await element.relation.outcome.forEach((element) => {
        listAllOutCome.push(element);
      });
      await element.relation.impact_area.forEach((element) => {
        listAllImpact.push(element);
      });
    });

    return {
      sdgs: {
        sdg: listRegisterSdg,
        targets: listAllSdgTarget,
        indicator: listAllSdgindicators,
      },
      impact: {
        impact: listRegisterImpact,
        global: listAllGlobalTargets,
        indicator: listAllImpactAreaIndicator,
        sdgs: listAllSgds,
      },
      action: {
        action: listRegisterAction,
        outcome: listAllOutCome,
        impact: listAllImpact,
      },
      outcome: {
        toc: listRegisterOutcome,
        action: listAllActionAreaToc,
        impact: listAllImpactAreaToc,
        sdg: listAllSdgtoc,
        regions: listAllRegions,
        country: lisAllCountries,
        indicator: listAllIndicators,
      },
    };
  }
/*
  async saveInDataBase(
    outputOutcomeResults: any,
    sdgResults: any,
    impactAreaResults: any,
    actionAreaResult: any
  ) {
    let database = new Database();
    let dbConn: Connection = await database.getConnection();

    let informationSave;
    try {
      informationSave = await this.mappingSaveDb(
        outputOutcomeResults,
        sdgResults,
        impactAreaResults,
        actionAreaResult
      );
    } catch (error) {
      return error;
    }
    console.log(informationSave);

    let sdgRepo = await dbConn.getRepository(TocSdgResults);
    console.log("1. Saving sdg");
    let sdgSave;
    try {
      sdgSave = await sdgRepo.save(informationSave.sdgs.sdg);
    } catch (error) {
      return error;
    }
    if (sdgSave != null && sdgSave.length > 0) {
      const sdgTarget = await dbConn.getRepository(TocSdgResultsSdgTargets);
      let sdgTargetSave;
      try {
        console.log("2. Saving Sdg_target ");
        sdgTargetSave = await sdgTarget.save(informationSave.sdgs.targets);
      } catch (error) {
        return error;
      }
      if (sdgTargetSave != null) {
        const sdgIndicators = await dbConn.getRepository(
          TocSdgResultsSdgIndicators
        );
        let sdgSaveIndicator;
        try {
          console.log("3. Saving sdg_indicator ");
          sdgSaveIndicator = await sdgIndicators.save(
            informationSave.sdgs.indicator
          );
        } catch (error) {
          return error;
        }
      }
      const repoImpactArea = await dbConn.getRepository(TocImpactAreaResults);
      let saveImpactArea;
      console.log("4. Saving Impact Area ");
      try {
        saveImpactArea = await repoImpactArea.save(
          informationSave.impact.impact
        );
      } catch (error) {
        return error;
      }
      if (saveImpactArea != null) {
        let saveImpactGlobal;
        let saveImpactIndicator;
        let saveImpactSdg;
        const repoImpactGlobal = await dbConn.getRepository(
          TocImpactAreaResultsGlobalTargets
        );
        try {
          console.log("5. Saving Impact Area global target ");
          saveImpactGlobal = await repoImpactGlobal.save(
            informationSave.impact.global
          );
        } catch (error) {
          return error;
        }
        if (saveImpactGlobal != null) {
          const repoImpactIndicator = await dbConn.getRepository(
            TocImpactAreaResultsImpactAreaIndicators
          );
          try {
            console.log("6. Saving Impact Area Indicator");
            saveImpactIndicator = await repoImpactIndicator.save(
              informationSave.impact.indicator
            );
          } catch (error) {
            return error;
          }
        }
        if (saveImpactIndicator != null) {
          const repoImpactsdg = await dbConn.getRepository(
            TocImpactAreaResultsSdgResults
          );
          try {
            console.log("7. Saving Impact Area Sdg ");
            saveImpactSdg = await repoImpactsdg.save(
              informationSave.impact.sdgs
            );
          } catch (error) {
            return error;
          }
        }
        const repoActionAre = await dbConn.getRepository(TocActionAreaResults);
        console.log("8. Saving action Area ");
        let actionAreaSave;
        try {
          actionAreaSave = await repoActionAre.save(
            informationSave.action.action
          );
        } catch (error) {
          return error;
        }
        if (actionAreaSave != null) {
          const repoActionOutcome = await dbConn.getRepository(
            TocActionAreaResultsOutcomesIndicators
          );
          let saveActionOutcome;
          let saveActionImpact;
          try {
            console.log("9. Saving action Area outcome");
            saveActionOutcome = await repoActionOutcome.save(
              informationSave.action.outcome
            );
          } catch (error) {
            return error;
          }
          if (saveActionOutcome != null) {
            const repoActionImpact = await dbConn.getRepository(
              TocActionAreaResultsImpactAreaResults
            );
            try {
              console.log("10. Saving action Area impact area");
              saveActionImpact = await repoActionImpact.save(
                informationSave.action.impact
              );
            } catch (error) {
              return error;
            }
          }
          const repoOutcomeToc = await dbConn.getRepository(TocResults);
          let saveTocResults;
          try {
            console.log("11. Saving Toc result");
            saveTocResults = await repoOutcomeToc.save(
              informationSave.outcome.toc
            );
          } catch (error) {
            return error;
          }
          if (saveTocResults != null) {
            const repoActionAreasTocResults = await dbConn.getRepository(
              TocResultsActionAreaResults
            );
            let actionAreasTocResult;
            let impactAreaTocResult;
            let sdgTocResult;
            let indicatorTocResult;
            let countryTocResult;
            let regionTocResult;
            try {
              //console.log(informationSave.outcome.action);
              console.log("12. Saving toc result action area");
              actionAreasTocResult = await repoActionAreasTocResults.save(
                informationSave.outcome.action
              );
            } catch (error) {
              return error;
            }
            if (actionAreasTocResult != null) {
              const repoImpactAreaTocResult = await dbConn.getRepository(
                TocResultsImpactAreaResults
              );
              try {
                console.log("13. Saving toc result impact area");
                impactAreaTocResult = await repoImpactAreaTocResult.save(
                  informationSave.outcome.impact
                );
              } catch (error) {
                return error;
              }
            }
            if (impactAreaTocResult != null) {
              const repoSdgTocResult = await dbConn.getRepository(
                TocResultsSdgResults
              );
              try {
                console.log("14. Saving toc result sdg");
                sdgTocResult = await repoSdgTocResult.save(
                  informationSave.outcome.sdg
                );
              } catch (error) {
                return error;
              }
            }
            if (sdgTocResult != null) {
              const repoIndicatorTocResult = await dbConn.getRepository(
                TocResultsIndicators
              );
              try {
                console.log("15. Saving toc result indicator");
                indicatorTocResult = await repoIndicatorTocResult.save(
                  informationSave.outcome.indicator
                );
              } catch (error) {
                return error;
              }
            }
            if (indicatorTocResult != null) {
              const repoCountriesTocResult = await dbConn.getRepository(
                TocResultsCountries
              );
              try {
                console.log("16. Saving toc result country");
                countryTocResult = await repoCountriesTocResult.save(
                  informationSave.outcome.country
                );
              } catch (error) {
                return error;
              }
            }
            if (countryTocResult != null) {
              const repoRegionsTocResult = await dbConn.getRepository(
                TocResultsRegions
              );
              try {
                console.log("17. Saving toc result region");
                regionTocResult = await repoRegionsTocResult.save(
                  informationSave.outcome.regions
                );
                return {
                  Message: "Finish saving toc board in submission tool",
                  Information: informationSave,
                };
              } catch (error) {
                return error;
              }
            }
          }
        }
      }
    }
  }*/
}
