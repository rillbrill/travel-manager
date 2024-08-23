import { Activity } from 'src/modules/activity/entities/activity.entity';
import { Plan } from 'src/modules/plan/entities/plan.entity';
import moment from 'moment-timezone';

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

  @Column({
    type: 'timestamp',
    transformer: {
      to: (value: Date) => moment(value).utc().toDate(), // 저장 시 UTC로 변환
      from: (value: Date) => moment(value).tz('Asia/Seoul').toDate(), // 읽을 때 로컬 타임존으로 변환
    },
  })
  date: Date;

  @OneToMany(() => Activity, (activity) => activity.day, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  activities: Activity[];
}
