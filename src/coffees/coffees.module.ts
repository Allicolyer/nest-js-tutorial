import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

/**
 * This decorator provides meta data that nest uses to organize the applications tructure.
 * Modules contain:
 *  1. controllers - API routes that we want this moudle to instantiate
 *  2. exports - proivders that should be availble anywhere this module is available
 *  3. imports - other modules that this module requires. They will be full available within this module as well.
 *  4. providers - services that need to be instantiated by the nest injector. Any providers here will be availble
 * only within this moudle istself, unless added to the export array. (private providers and services)
 *
 *
 * Putting the controller and the service here means we can remove them from the AppModule
 */
@Module({
  imports: [
    // For root is only used once. For feature is used in all other modules
    TypeOrmModule.forFeature([Coffee, Flavor, Event]),
  ],
  controllers: [CoffeesController],
  /**
   * This registers this provider with the Nest Inversion of Control Containers.
   * This is actually a shorthand syntax for a more complete syntax.
   * The detailed syntax would be represented as an object with two properties: 'provide' and 'useClass'.
   * This would look like:
   * {
   *   provide: CoffeesService,
   *   useClass: CoffeesService
   * }
   * In this more verbose form:
   * - 'provide' is the DI token that is used to inject the dependency,
   * - 'useClass' is the actual class that will be instantiated and injected by Nest's IoC container.
   * This shorthand is possible and functionally equivalent when the token and the class are the same.
   */
  providers: [CoffeesService],
})
export class CoffeesModule {}
