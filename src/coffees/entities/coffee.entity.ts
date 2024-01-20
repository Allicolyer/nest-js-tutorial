// An entity represents the relationship between a typescript class and a database model

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // sql table == 'coffee'. If you awnt to use a different name for your table than the name of this class, pass the name into this entity decorator
export class Coffee {
  // This decorator identifies id as the pimary columns
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  brand: string;
  @Column('json', { nullable: true })
  flavors: string[];
}
