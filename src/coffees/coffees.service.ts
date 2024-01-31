import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Flavor } from './entities/flavor.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Event } from '../events/entities/event.entity';

/**
 * Each service is a provider. The main idea of a proivder is that it can inject dependencies.
 * This means that objects can create various relationships to each other and the logic of wiring up instances of
 * objects together can all be handled by the nest runtime system.
 * This is done, as opposed as trying to create this dependcy injection yoruself.
 *
 * The injectable decorator is what makes this class a provider.
 * So how do you actually inject this proivder into a controller? You do it with the constructor of that controller.
 *
 * Typically in applications, providers and services handle business logic as well as interactions with data sources
 */

@Injectable()
export class CoffeesService {
  constructor(
    // Repository design pattern:
    // Repositry acts ass an abstraction over the database to interact with the records.
    // This is our data source
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
    // This dataSource object from TypeORM will let us use transaction
    private readonly dataSource: DataSource,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    // there are lots of built in methods for this repository
    return this.coffeeRepository.find({
      // This will load the flavors relation
      relations: { flavors: true },
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: string) {
    const coffee: Coffee = await this.coffeeRepository.findOne({
      where: { id: +id },
      relations: { flavors: true },
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found,`);
    }
    return coffee;
  }

  async create(createCoffeeDto: CreateCoffeeDto): Promise<Coffee> {
    // Loop through all the flavros
    // The awwait keyword here waits for the entire array of promises finisheds
    // before executing the next line of code.
    const flavors = await Promise.all(
      createCoffeeDto.flavors.map((name) => this.preloadFlavorByName(name)),
    );

    const coffee = this.coffeeRepository.create({
      ...createCoffeeDto,
      flavors,
    });
    return this.coffeeRepository.save(coffee);
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    // Loop through all the flavros
    // The awwait keyword here waits for the entire array of promises finisheds
    // before executing the next line of code.
    const flavors =
      updateCoffeeDto.flavors &&
      (await Promise.all(
        updateCoffeeDto.flavors.map((name) => this.preloadFlavorByName(name)),
      ));
    //preload creates a new entity based on the object passed into it
    //preload first looks to see if the entity already exists in the database
    const coffee = await this.coffeeRepository.preload({
      id: +id,
      ...updateCoffeeDto,
      flavors,
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return this.coffeeRepository.save(coffee);
  }

  async remove(id: string) {
    const coffee = await this.findOne(id);
    return this.coffeeRepository.remove(coffee);
  }

  private async preloadFlavorByName(name: string): Promise<Flavor> {
    // If this flavor already exists, return it.
    const existingFlavor = await this.flavorRepository.findOne({
      where: { name },
    }); // 👈 notice the "where"
    if (existingFlavor) {
      return existingFlavor;
    }
    return this.flavorRepository.create({ name });
  }

  async recommendCoffee(coffee: Coffee) {
    // Create a query runner
    const queryRunner = this.dataSource.createQueryRunner();
    // Establish a connection to the database
    await queryRunner.connect();
    // Start the transactionprocess
    await queryRunner.startTransaction();
    // Wrap the whole thing with a try/catch so that we can roll back if something fails
    try {
      coffee.recommendations++;

      const recommendEvent: Event = new Event();
      recommendEvent.name = 'recommend_coffee';
      recommendEvent.type = 'coffee';
      recommendEvent.payload = { coffeeId: coffee.id };

      await queryRunner.manager.save(coffee);
      await queryRunner.manager.save(recommendEvent);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
