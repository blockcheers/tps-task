import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1695667291363 implements MigrationInterface {
    name = 'migrations1695667291363'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "videos" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, "url" character varying NOT NULL, "transaction_id" integer, CONSTRAINT "PK_e4c86c0cf95aff16e9fb8220f6b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "transaction_id" integer, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transactions" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "type" character varying NOT NULL, "qty" integer NOT NULL, "min_price" numeric(10,2) NOT NULL, "available_to_buy" boolean NOT NULL DEFAULT true, "thumbnail" character varying NOT NULL, "cover_image" character varying NOT NULL, "updated_at" character varying NOT NULL, "release_date" character varying NOT NULL, "region" character varying NOT NULL, "developer" character varying NOT NULL, "publisher" character varying NOT NULL, "platform" character varying NOT NULL, "price_limit" jsonb NOT NULL, "requirements" jsonb NOT NULL, CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "images" ("id" SERIAL NOT NULL, "url" character varying NOT NULL, "transaction_id" integer, CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "videos" ADD CONSTRAINT "FK_de4bc4500a682f7cbda2aa834a2" FOREIGN KEY ("transaction_id") REFERENCES "transactions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_0f5b6f44a9219cae60c192f14e2" FOREIGN KEY ("transaction_id") REFERENCES "transactions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "images" ADD CONSTRAINT "FK_0914c20bae007057b45667f89a8" FOREIGN KEY ("transaction_id") REFERENCES "transactions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "images" DROP CONSTRAINT "FK_0914c20bae007057b45667f89a8"`);
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_0f5b6f44a9219cae60c192f14e2"`);
        await queryRunner.query(`ALTER TABLE "videos" DROP CONSTRAINT "FK_de4bc4500a682f7cbda2aa834a2"`);
        await queryRunner.query(`DROP TABLE "images"`);
        await queryRunner.query(`DROP TABLE "transactions"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "videos"`);
    }

}
