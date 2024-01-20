import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
    // This is our data source
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
  ) {}

  findAll() {
    return this.coffeeRepository.find();
  }

  async findOne(id: string) {
    const coffee: Coffee = await this.coffeeRepository.findOne({
      where: { id: +id },
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found,`);
    }
    return coffee;
  }

  create(createCoffeeDto: CreateCoffeeDto): Promise<Coffee> {
    const coffee = this.coffeeRepository.create(createCoffeeDto);
    return this.coffeeRepository.save(coffee);
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    //preload creates a new entity baed on the object passed into it
    const coffee = await this.coffeeRepository.preload({
      id: +id,
      ...updateCoffeeDto,
    });
    if (!coffee) {
      // update the existing entity
    }
  }

  async remove(id: string) {
    const coffee = await this.findOne(id);
    return this.coffeeRepository.remove(coffee);
  }
}
