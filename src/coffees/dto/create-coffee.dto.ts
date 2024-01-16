import { IsString } from 'class-validator';

/**
 * Dto stands for data transfer object
 * Dtos define the shape of the body that is coming into an API request
 */
export class CreateCoffeeDto {
  @IsString()
  readonly name: string;
  @IsString()
  readonly brand: string;
  @IsString({ each: true })
  readonly flavors: string[];
}
