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
import { create } from 'domain';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CreateCoffeeDto } from './dto/create-coffee.dto';

@Controller('coffees')
export class CoffeesController {
  /**
   * Nest handles dependencie injection for you by looking at the type of whatever you pass into the constructor's parameters
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
  create(@Body() CreateCoffeeDto: CreateCoffeeDto) {
    return this.coffeeService.create(CreateCoffeeDto);
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
