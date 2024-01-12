import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';

@Module({
  imports: [CoffeesModule],
  controllers: [AppController],
  // Each service is a provider. The main idea of a proivder is that it can inject dependencies.
  providers: [AppService],
})
export class AppModule {}
