// A database transaction symbolizes a unit of work performed within a database management system
// Transations are a reliable way to handle multipel tasks independent of other tasks
// The QueryRunner class  is used for this. This ensure the ACID properties of our database.

import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

// Composite index that contains Multiple columns
@Index(['name', 'type']) // <--
@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  // Special lookup tables that our database can use to speed up retrival.
  // Let's say that a very common lookup is to retrieve an event based on its name.
  // To help speed up this search, lets index the table based on it's name.
  // Indexes can help give our application rapid random lookups and efficent access of order records
  // Use them when performace is important
  @Index()
  @Column()
  name: string;

  @Column('json')
  payload: Record<string, any>;
}
