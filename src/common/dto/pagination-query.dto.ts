import { IsOptional, IsPositive } from 'class-validator';
// This class is in the common directory.
// Classes that are not tied to any specific domain will be in this folder
export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  // Rather than adding this type command we could have instead
  // used the transformOptions paraemter for the ValidationPipe
  limit: number;

  @IsOptional()
  @IsPositive()
  offset: number;
}
