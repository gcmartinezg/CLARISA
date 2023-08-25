import { MigrationInterface, QueryRunner } from "typeorm";

export class updateInitiativeKeys1692974493673 implements MigrationInterface {
    name = 'updateInitiativeKeys1692974493673'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`submission_tool_initiative_stages\` DROP FOREIGN KEY \`FK_d0ba7c7b12e8ad019125aadde71\``);
        await queryRunner.query(`ALTER TABLE \`submission_tool_initiatives\` CHANGE \`id\` \`id\` bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`submission_tool_initiatives\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`submission_tool_initiatives\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`submission_tool_initiatives\` ADD \`id\` bigint NOT NULL PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`submission_tool_initiative_stages\` ADD CONSTRAINT \`FK_d0ba7c7b12e8ad019125aadde71\` FOREIGN KEY (\`initiative_id\`) REFERENCES \`submission_tool_initiatives\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`submission_tool_initiative_stages\` DROP FOREIGN KEY \`FK_d0ba7c7b12e8ad019125aadde71\``);
        await queryRunner.query(`ALTER TABLE \`submission_tool_initiatives\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`submission_tool_initiatives\` ADD \`id\` bigint NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`submission_tool_initiatives\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`submission_tool_initiatives\` CHANGE \`id\` \`id\` bigint NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`submission_tool_initiative_stages\` ADD CONSTRAINT \`FK_d0ba7c7b12e8ad019125aadde71\` FOREIGN KEY (\`initiative_id\`) REFERENCES \`submission_tool_initiatives\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
