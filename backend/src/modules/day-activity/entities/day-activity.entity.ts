import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Day } from 'src/modules/day/entities/day.entity';

@Entity('dayActivities')
export class DayActivity {
  @PrimaryGeneratedColumn('uuid') // UUID로 기본 키 생성
  id: string;

  @ManyToOne(() => Day, (day) => day.activities, { nullable: false })
  @JoinColumn({ name: 'day_id' }) // 외래 키 명시
  day: Day;

  @Column({ type: 'varchar', length: 30 })
  activity_name: string;

  @Column({ type: 'varchar', length: 255 })
  detail: string;

  @Column({ type: 'varchar', length: 255 })
  activity_location: string;

  @Column({ type: 'int' })
  activity_expenses: number;
}
