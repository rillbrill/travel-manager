import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('plans')
export class Plan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  plan_name: string;

  @Column()
  plan_country: string;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column()
  head_count: number;

  @Column()
  total_expenses: number;

  @Column({ default: false })
  plan_end: boolean;
}
