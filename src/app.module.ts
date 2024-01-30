import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  // THis module makes it easy to use type orm
  imports: [
    CoffeesModule,
    TypeOrmModule.forRoot({
      type: 'postgres', // type of our database
      host: 'localhost', // database host
      port: 5432, // database host
      username: 'postgres', // username for accessing database
      password: 'postgres', // user password
      database: 'postgres', // name of our database that our application will be using
      autoLoadEntities: true, // models will be loaded automatically instead of specifing the entities array
      synchronize: true, // your entities will be synced with the database(recommended: disable in prod)
    }),
  ],
  controllers: [AppController],
  // Each service is a provider. The main idea of a proivder is that it can inject dependencies.
  providers: [AppService],
})
export class AppModule {}
