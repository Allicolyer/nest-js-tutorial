// A database transaction symbolizes a unit of work performed within a database management system
// Transactions are a reliable way to handle multiple tasks independent of other tasks
// The QueryRunner class is used for this. This ensures the ACID properties of our database.

import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

// Composite index that contains multiple columns
@Index(['name', 'type']) // <--
@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  // Special lookup tables that our database can use to speed up retrieval.
  // Let's say that a very common lookup is to retrieve an event based on its name.
  // To help speed up this search, let's index the table based on its name.
  // Indexes can help give our application rapid random lookups and efficient access of ordered records
  // Use them when performance is important
  @Index()
  @Column()
  name: string;

  @Column('json')
  payload: Record<string, any>;
}
