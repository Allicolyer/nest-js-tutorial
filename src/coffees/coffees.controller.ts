import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CreateCoffeeDto } from './dto/create-coffee.dto';

/**
 * When the nest container instantiates the CoffeesController, it first looks to see if there are any dependencies needed.
 * In our case there is one, the coffee service. When the nest container finds the coffeeService dependency, it performs
 * a lookup on the coffee service token, which returns the coffee service class. Assuming this provider has a singleton scope, which
 * is the default behavior of injectable providers, Nest will then either create an instance of CoffeeService, cache it and return it
 * or if one is already cached, it will return that existing instance.
 *
 * If coffee service also has dependencies, which it does, Nest needs to resolve these dependencies in the correct order.
 * The depdencey graph is resolved from the bottom up. This mechanism relives the developer from having to do this.
 */
@Controller('coffees')
export class CoffeesController {
  /**
   * Nest handles dependencie injection for you by looking at the type of whatever you pass into the constructor's parameters
   * Here we are requesting the coffeeService in our constructor that tells nest to inject it
   * @param coffeeService
   *
   * the private keyword allows us to declare and initalize the coffeeservice immediately in the same location as well as making it only acessible within the class itself
   * the keyword readonly is a best practice that helps us ensure you can't modify the serive reference and can only acccess thigns from it
   * the name of this service is coffeeService
   *
   * In Nest, the dependcies are resolved simply by their type. Nest will resolve the coffeeService by creating and returning an instance of coffeeService to the coffee controller.
   * In the normal case of a singleton, when this coffeeService is accessed, the instance that was already created is returned.
   *
   * This dependency is resovled and passed to this constructor or assigned to the indicated proeprty within the controller
   *
   */
  constructor(private readonly coffeeService: CoffeesService) {}
  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.coffeeService.findAll(paginationQuery);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    this.coffeeService.findOne(id);
  }

  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeeService.create(createCoffeeDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeeService.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeeService.remove(id);
  }
}
