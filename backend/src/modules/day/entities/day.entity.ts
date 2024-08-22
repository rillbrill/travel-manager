import { DayActivity } from 'src/modules/day-activity/entities/day-activity.entity';
import { Plan } from 'src/modules/plan/entities/plan.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity('days')
export class Day {
  @PrimaryGeneratedColumn('uuid') // UUID로 기본 키 생성
  id: string;

  @ManyToOne(() => Plan, (plan) => plan.days) // Plan 엔티티와 다대일 관계 설정
  @JoinColumn({ name: 'plan_id' }) // 외래 키 명시
  plan: Plan;

  @Column({ type: 'timestamp' })
  date: Date;

  @Column({ type: 'varchar', length: 255 })
  day_city: string;

  @Column({ type: 'varchar', length: 255 })
  day_loc: string;

  @OneToMany(() => DayActivity, (activity) => activity.day)
  activities: DayActivity[];
}
