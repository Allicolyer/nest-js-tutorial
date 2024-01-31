import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Coffee } from './coffee.entity';

//Make sure this class is called flavor so that the database table gets named flavor
@Entity()
export class Flavor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // We don't need the JoinTable decorator again because
  // coffee is the owner of the relationship
  @ManyToMany(
    // Declare the type of the inverse entity relation
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (type) => Coffee,
    // Select where flavor is located on the coffee entity
    (coffee) => coffee.flavors,
  )
  coffees: Coffee[];
}

// The coffee and flavors have a many to many relationships
