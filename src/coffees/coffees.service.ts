import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

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
  // This will be our mock data source for our coffees. We will pretend it is a db and do read, write, delete operations.
  private coffees: Coffee[] = [
    {
      id: 1,
      name: "Alli's favorite",
      brand: 'LA Roasters',
      flavors: ['nutty', 'floral', 'zesty banana peel', 'dirty sock'],
    },
  ];

  findAll() {
    return this.coffees;
  }

  findOne(id: string) {
    const coffee: Coffee = this.coffees.find((item) => item.id === +id);
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found,`);
    }
    return coffee;
  }

  create(createCoffeeDto: any) {
    this.coffees.push(createCoffeeDto);
  }

  update(id: string, updateCoffeeDto: any) {
    const existingCoffee = this.findOne(id);
    if (existingCoffee) {
      // update the existing entity
    }
  }

  remove(id: string) {
    const coffeeIndex = this.coffees.findIndex((item) => item.id === +id);
    if (coffeeIndex >= 0) {
      this.coffees.splice(coffeeIndex, 1);
    }
  }
}
