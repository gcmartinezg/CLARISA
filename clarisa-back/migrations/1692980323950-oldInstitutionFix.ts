import { MigrationInterface, QueryRunner } from "typeorm";

export class oldInstitutionFix1692980323950 implements MigrationInterface {
    name = 'oldInstitutionFix1692980323950'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`institution_locations\` ADD CONSTRAINT \`FK_925720f685c6e80a6dd12e8b179\` FOREIGN KEY (\`institution_id\`) REFERENCES \`old_institutions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`old_institutions\` ADD CONSTRAINT \`FK_83a588b69f097bbfed85729b752\` FOREIGN KEY (\`institution_type_id\`) REFERENCES \`institution_types\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`old_institutions\` DROP FOREIGN KEY \`FK_83a588b69f097bbfed85729b752\``);
        await queryRunner.query(`ALTER TABLE \`institution_locations\` DROP FOREIGN KEY \`FK_925720f685c6e80a6dd12e8b179\``);
    }

}
