import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { COFFEE_BRANDS } from './coffees.constants';
class ConfigService {}
class DevelopmentConfigService {}
class ProductionConfigService {}
/**
 * This decorator provides metadata that Nest uses to organize the application's structure.
 * Modules contain:
 *  1. controllers - API routes that we want this module to instantiate
 *  2. exports - providers that should be available anywhere this module is imported
 *  3. imports - other modules that this module requires. They will be fully available within this module as well.
 *  4. providers - services that need to be instantiated by the Nest injector. Any providers here will be available
 * only within this module itself, unless added to the exports array. (private providers and services)
 *
 *
 * Putting the controller and the service here means we can remove them from the AppModule.
 */
@Module({
  imports: [
    // ForRoot is only used once. ForFeature is used in all other modules.
    TypeOrmModule.forFeature([Coffee, Flavor]),
  ],
  controllers: [CoffeesController],
  /**
   * This registers this provider with the Nest Inversion of Control Container.
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

  /**
   * The useValue is useful for injecting a constant value, such as injecting an external library or
   * replacing the real implementation of a service with a mock object.
   * {
   *   provide: CoffeesService,
   *   useValue: new MockCoffeesService()
   * }
   */
  providers: [
    CoffeesService,
    /**
     * This is known as non-class based provider tokens which 
     * allows us to inject the COFFEE_BRANDS into this class with the value provided
     * {
     *   provide: 'COFFEE_BRANDS',
     *   useValue: ['buddy brew', 'nescafe']
     * }
     * 
     * Then we can use this syntax to provide the token which NestJS should use when injecting this class
     * 
     * @Inject(COFFEE_BRANDS) coffeeBrands: string[],
     * 
    /**
     * This is another custom provider pattern.
     */
    {
      provide: ConfigService,
      useClass:
        process.env.NODE_ENV === 'development'
          ? DevelopmentConfigService
          : ProductionConfigService,
    },
    {
      provide: COFFEE_BRANDS,
      useValue: () => ['buddy brew', 'nescafe'],
    },
    /**
     * The useFactory provider pattern is very common in NestJS.
     * The useFactory syntax allows us to create providers dynamically, which can be extremely useful if you need to base
     * the providers' value on the various other dependencies values, etc.
     *
     * The value returned from the factory function is what will be used by the provider token.
     * What makes these factory functions so special is that they themselves can inject other providers needed to compute the returning result.
     *
     */
  ],
  /**
   * All modules encapsulate their providers by default - if we want to use them in another module,
   * we must explicitly export them, making them a publicly available part of the API.
   *
   */
  exports: [CoffeesService],
})
export class CoffeesModule {}

// class MockCoffeesService {}
