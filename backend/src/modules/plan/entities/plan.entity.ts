import { Day } from 'src/modules/day/entities/day.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('plans')
export class Plan {
  @PrimaryGeneratedColumn('uuid') // UUID로 기본 키 생성
  id: string;

  @Column({ type: 'varchar', length: 255 })
  plan_name: string;

  @Column({ type: 'varchar', length: 255 })
  plan_country: string;

  @Column({ type: 'int' })
  head_count: number;

  @Column({ type: 'int' })
  total_expenses: number;

  @Column({ type: 'timestamp' })
  start_date: Date;

  @Column({ type: 'timestamp' })
  end_date: Date;

  @Column({ type: 'boolean', default: false })
  plan_end: boolean;

  @OneToMany(() => Day, (day) => day.plan) // Day 엔티티와 일대다 관계 설정
  days: Day[];
}
