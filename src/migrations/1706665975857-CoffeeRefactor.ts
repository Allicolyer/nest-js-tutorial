import { MigrationInterface, QueryRunner } from 'typeorm';

export class CoffeeRefactor1706665975857 implements MigrationInterface {
  // Every migration should have an up and down method.
  // Up is where we instruct what needs to be changed and how.
  // Down is where we undo or roll back any of those changes.
  // Down is extremely important in case an issue comes up and we need to have an exit strategy.
  public async up(queryRunner: QueryRunner): Promise<void> {
    // At one point in the tutorial, we changed this from name to title on the coffee entity.
    // If we did not have migrations, the name column would be removed and the title column would be added.
    // Migrations will help us rename a column while maintaining the data.
    // You can do any migrations you need in this up method.
    await queryRunner.query(
      `ALTER TABLE "coffee" RENAME COLUMN "name" TO "title"`,
    );
  }

  // This provides data for how our migration will be rolled back in the future.
  // Revert the title back to name.
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "coffee" RENAME COLUMN "title" TO "name"`,
    );
  }
}
