import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewIndicatorFieldsForDashboard1696001940352
  implements MigrationInterface
{
  name = 'NewIndicatorFieldsForDashboard1696001940352';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`action_areas\` ADD \`icon\` text NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`action_areas\` ADD \`color\` text NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`impact_areas\` ADD \`icon\` text NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`impact_areas\` ADD \`color\` text NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`global_targets\` ADD \`smo_code\` varchar(20) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sustainable_development_goals\` ADD \`color\` text NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`sustainable_development_goals\` DROP COLUMN \`color\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`global_targets\` DROP COLUMN \`smo_code\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`impact_areas\` DROP COLUMN \`color\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`impact_areas\` DROP COLUMN \`icon\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`action_areas\` DROP COLUMN \`color\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`action_areas\` DROP COLUMN \`icon\``,
    );
  }
}
