import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';

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
    // For root is only used once. For feature isused in all other modules
    TypeOrmModule.forFeature([Coffee]),
  ],
  controllers: [CoffeesController],
  providers: [CoffeesService],
})
export class CoffeesModule {}
