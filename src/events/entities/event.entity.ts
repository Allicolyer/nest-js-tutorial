// A database transaction symbolizes a unit of work performed within a database management system
// Transations are a reliable way to handle multipel tasks independent of other tasks
// The QueryRunner class  is used for this

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  name: string;

  @Column('json')
  payload: Record<string, any>;
}
