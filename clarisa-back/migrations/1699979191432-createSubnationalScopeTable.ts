import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSubnationalScopeTable1699979191432
  implements MigrationInterface
{
  name = 'CreateSubnationalScopeTable1699979191432';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`subnational_scope\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`code\` varchar(20) NULL, \`name\` text NULL, \`name_language_iso_3\` text NULL, \`subdivision_category_name\` text NULL, \`country_id\` bigint NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`is_active\` tinyint(1) NOT NULL DEFAULT 1, \`created_by\` bigint NOT NULL, \`updated_by\` bigint NULL, \`modification_justification\` text NULL, UNIQUE INDEX \`IDX_79830f698fd657e0c39805807a\` (\`code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`subnational_scope\` ADD CONSTRAINT \`FK_c6bc078fc8121806e432fa265af\` FOREIGN KEY (\`country_id\`) REFERENCES \`countries\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`subnational_scope\` DROP FOREIGN KEY \`FK_c6bc078fc8121806e432fa265af\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_79830f698fd657e0c39805807a\` ON \`subnational_scope\``,
    );
    await queryRunner.query(`DROP TABLE \`subnational_scope\``);
  }
}
