import { MigrationInterface, QueryRunner } from "typeorm";

export class phasesIPSR1691011601274 implements MigrationInterface {
    name = 'phasesIPSR1691011601274'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`phases_ipsr\` (\`id\` varchar(255) NOT NULL, \`name\` text NOT NULL, \`year\` int NOT NULL, \`is_open\` tinyint(1) NOT NULL DEFAULT 1, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`is_active\` tinyint(1) NOT NULL DEFAULT 1, \`created_by\` bigint NOT NULL, \`updated_by\` bigint NULL, \`modification_justification\` text NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`phases_ipsr\``);
    }

}
