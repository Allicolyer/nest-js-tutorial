import { Coffee } from 'src/coffees/entities/coffee.entity';
import { Flavor } from 'src/coffees/entities/flavor.entity';
import { CoffeeRefactor1706665975857 } from 'src/migrations/1706665975857-CoffeeRefactor';
import { SchemaSync1706667485592 } from 'src/migrations/1706667485592-SchemaSync';
import { DataSource } from 'typeorm';

// Migrations provide a way to incrementally update our database schema and keep it in sync with the application's data model, all while preserving existing data.
// To generate, run, and revert migrations,
// TypeORM provides a CLI for migrations.
// Migrations are separate from the Nest application's source code,
// This is because their lifecycle is maintained by the TypeORM CLI.
// Since these migrations are outside of Nest, we are unable to leverage dependency injection and other features for the database migration.

/* typeorm-cli.config.ts */
export default new DataSource({
  // These are all the configurations from the docker-compose file with a few additional key-values used to let TypeORM migrations know what the entities and migrations are.
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  // The TypeORM CLI can also generate migrations automatically for you.
  // It connects to the database and compares existing tables with entity definitions you provide.
  // If there are any differences, a migration is generated. These are classes it will do this for.
  // To generate migrations, do the following: npx typeorm migration:generate <file-name>
  // npx typeorm migration:generate src/migrations/SchemaSync -d dist/typeorm-cli.config
  entities: [Coffee, Flavor],
  migrations: [CoffeeRefactor1706665975857, SchemaSync1706667485592],
});

// CLI command: npx typeorm migration:create src/migrations/CoffeeRefactor
// npx is a utility that allows us to run executable packages without having to install them.
// THis let us use the typorm CLI without install it on the machine
// This command created a new file in the src/migration folders

/* RUNNING MIGRATIONS */

/**
 * 💡 Remember 💡
 * You must BUILD your Nest project (so that everything is output to the `/dist/` folder,
 * before a Migration can run, it needs compilated files.
 */

// // Compile project first
// npm run build

// // Run migration(s)
// npx typeorm migration:run -d dist/typeorm-cli.config

// // REVERT migration(s)
// npx typeorm migration:revert -d dist/typeorm-cli.config

// // Let TypeOrm generate migrations (for you)
// npx typeorm migration:generate src/migrations/SchemaSync -d dist/typeorm-cli.config
