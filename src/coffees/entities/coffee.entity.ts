// An entity represents the relatinship between a typescript class and a database model
//
// With the synchronize: true setting, A SQL table will be generated from all classes with the entity decorator and the metadata they contain
// This saves on time and is designed for development only

import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Flavor } from './flavor.entity';

@Entity() // sql table == 'coffee'. If you want to use a different name for your table than the name of this class, pass the name into this entity decorator
export class Coffee {
  // This decorator identifies id as the primary column, also auto increments the value for us
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  brand: string;
  // This decorator tells TypeORM that the owner side of the relationship is
  // the coffee entity
  @JoinTable()
  // This decorator is here because each coffee can have many flavors
  // and each flavor can belong to many coffees
  @ManyToMany(
    (type) => Flavor,
    (flavor) => flavor.coffees,
    // Flavors that blong to a newly added coffee will be automatically added to the database
    { cascade: true },
  )
  flavors: Flavor[];
}
