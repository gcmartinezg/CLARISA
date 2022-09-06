import { ActionAreaModule } from './action-area/action-area.module';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
import { GlossaryModule } from './glossary/glossary.module';
import { GlobalTargetsModule } from './global-targets/global-targets.module';
import { ImpactAreaModule } from './impact-area/impact-area.module';
import { StudyTypeModule } from './study-type/study-type.module';
import { SdgModule } from './sdg/sdg.module';
import { SdgTargetModule } from './sdg-target/sdg-target.module';
import { ImpactAreaIndicatorsModule } from './impact-area-indicators/impact-area-indicators.module';
import { ProjectedBenefitProbabilityModule } from './projected-benefit-probability/projected-benefit-probability.module';
import { ProjectedBenefitModule } from './projected-benefit/projected-benefit.module';
import { ActionAreaOutcomeModule } from './action-area-outcome/action-area-outcome.module';
import { OutcomeIndicatorModule } from './outcome-indicator/outcome-indicator.module';
import { ActionAreaOutcomeIndicatorModule } from './action-area-outcome-indicator/action-area-outcome-indicator.module';
import { CountryModule } from './country/country.module';
import { GeopositionModule } from './geoposition/geoposition.module';
import { SourcesModule } from './sources/sources.module';
import { RegionTypeModule } from './region-type/region-type.module';
import { RegionModule } from './region/region.module';
import { DepthDescriptionModule } from './depth-description/depth-description.module';
import { ProjectedBenefitDepthModule } from './projected-benefit-depth/projected-benefit-depth.module';
import { ProjectedBenefitWeightDescriptionModule } from './projected-benefit-weight-description/projected-benefit-weight-description.module';
import { ProjectedBenefitWeightingModule } from './projected-benefit-weighting/projected-benefit-weighting.module';
import { GeneralAcronymModule } from './general-acronym/general-acronym.module';
import { InnovationReadinessLevelModule } from './innovation-readiness-level/innovation-readiness-level.module';
import { InvestmentTypeModule } from './investment-type/investment-type.module';
import { InnovationUseLevelModule } from './innovation-use-level/innovation-use-level.module';
import { CgiarEntityModule } from './cgiar-entity/cgiar-entity.module';
import { CgiarEntityTypeModule } from './cgiar-entity-type/cgiar-entity-type.module';
import { SdgIndicatorModule } from './sdg-indicator/sdg-indicator.module';
import { OneCgiarUserModule } from './one-cgiar-user/one-cgiar-user.module';
import { BeneficiarieModule } from './beneficiarie/beneficiarie.module';
import { BusinessCategoryModule } from './business-category/business-category.module';
import { TechnicalFieldModule } from './technical-field/technical-field.module';
import { InnovationTypeModule } from './innovation-type/innovation-type.module';
import { GovernanceTypeModule } from './governance-type/governance-type.module';
import { EnvironmentalBenefitModule } from './environmental-benefit/environmental-benefit.module';
import { TechnologyDevelopmentStageModule } from './technology-development-stage/technology-development-stage.module';
import { WorkpackageModule } from './workpackage/workpackage.module';
import { InitiativeModule } from './initiative/initiative.module';

export const apiRoutes = [
  {
    path: 'users',
    module: UserModule,
  },
  {
    path: 'roles',
    module: RoleModule,
  },
  {
    path: 'action-areas',
    module: ActionAreaModule,
  },
  {
    path: 'impact-areas',
    module: ImpactAreaModule,
  },
  {
    path: 'glossary',
    module: GlossaryModule,
  },
  {
    path: 'global-targets',
    module: GlobalTargetsModule,
  },
  {
    path: 'study-types',
    module: StudyTypeModule,
  },
  {
    path: 'sdgs',
    module: SdgModule,
  },
  {
    path: 'sdg-targets',
    module: SdgTargetModule,
  },
  {
    path: 'impact-area-indicators',
    module: ImpactAreaIndicatorsModule,
  },
  {
    path: 'projected-benefit-probabilities',
    module: ProjectedBenefitProbabilityModule,
  },
  {
    path: 'projected-benefits',
    module: ProjectedBenefitModule,
  },
  {
    path: 'action-area-outcomes',
    module: ActionAreaOutcomeModule,
  },
  {
    path: 'outcome-indicators',
    module: OutcomeIndicatorModule,
  },
  {
    path: 'action-area-outcome-indicators',
    module: ActionAreaOutcomeIndicatorModule,
  },
  {
    path: 'countries',
    module: CountryModule,
  },
  {
    path: 'geopositions',
    module: GeopositionModule,
  },
  {
    path: 'sources',
    module: SourcesModule,
  },
  {
    path: 'region-types',
    module: RegionTypeModule,
  },
  {
    path: 'regions',
    module: RegionModule,
  },
  {
    path: 'depth-scales',
    module: DepthDescriptionModule,
  },
  {
    path: 'projected-benefit-depth',
    module: ProjectedBenefitDepthModule,
  },
  {
    path: 'depth-descriptions',
    module: ProjectedBenefitWeightDescriptionModule,
  },
  {
    path: 'projected-benefit-weighting',
    module: ProjectedBenefitWeightingModule,
  },
  {
    path: 'acronyms',
    module: GeneralAcronymModule,
  },
  {
    path: 'innovation-readiness-levels',
    module: InnovationReadinessLevelModule,
  },
  {
    path: 'investment-type',
    module: InvestmentTypeModule,
  },
  {
    path: 'innovation-use-levels',
    module: InnovationUseLevelModule,
  },
  {
    path: 'cgiar-entities',
    module: CgiarEntityModule,
  },
  {
    path: 'cgiar-entity-type',
    module: CgiarEntityTypeModule,
  },
  {
    path: 'oc-users',
    module: OneCgiarUserModule,
  },
  {
    path: 'beneficiaries',
    module: BeneficiarieModule,
  },
  {
    path: 'sdg-indicators',
    module: SdgIndicatorModule,
  },
  {
    path: 'business-categories',
    module: BusinessCategoryModule,
  },
  {
    path: 'technical-fields',
    module: TechnicalFieldModule,
  },
  {
    path: 'innovation-types',
    module: InnovationTypeModule,
  },
  {
    path: 'governance-types',
    module: GovernanceTypeModule,
  },
  {
    path: 'environmental-benefits',
    module: EnvironmentalBenefitModule,
  },
  {
    path: 'technology-development-stages',
    module: TechnologyDevelopmentStageModule,
  },
  {
    path: 'workpackages',
    module: WorkpackageModule,
  },
  {
    path: 'initiatives',
    module: InitiativeModule,
  },
];
