import { ActionAreaModule } from './action-area/action-area.module';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
import { GlossaryModule } from './glossary/glossary.module';
import { GlobalTargetsModule } from './global-targets/global-targets.module';
import { ImpactAreaModule } from './impact-area/impact-area.module';
import { StudyTypeModule } from './study-type/study-type.module';
import { SdgModule } from './sdg/sdg.module';
import { SdgTargetModule } from './sdg-target/sdg-target.module';

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
];
