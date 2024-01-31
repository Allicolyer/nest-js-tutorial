import { CoffeeRefactor1706665975857 } from 'src/migrations/1706665975857-CoffeeRefactor';
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
  entities: [],
  migrations: [CoffeeRefactor1706665975857],
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
