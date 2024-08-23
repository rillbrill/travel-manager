import { Day } from 'src/modules/day/entities/day.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import moment from 'moment-timezone';

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

  @Column({ type: 'int', default: 0 })
  total_expenses: number;

  @Column({
    type: 'timestamp',
    transformer: {
      to: (value: Date) => moment(value).utc().toDate(), // 저장 시 UTC로 변환
      from: (value: Date) => moment(value).tz('Asia/Seoul').toDate(), // 읽을 때 로컬 타임존으로 변환
    },
  })
  start_date: Date;

  @Column({
    type: 'timestamp',
    transformer: {
      to: (value: Date) => moment(value).utc().toDate(), // 저장 시 UTC로 변환
      from: (value: Date) => moment(value).tz('Asia/Seoul').toDate(), // 읽을 때 로컬 타임존으로 변환
    },
  })
  end_date: Date;

  @Column({ type: 'boolean', default: false })
  plan_end: boolean;

  @OneToMany(() => Day, (day) => day.plan, { onDelete: 'CASCADE' }) // Day 엔티티와 일대다 관계 설정
  days: Day[];
}
