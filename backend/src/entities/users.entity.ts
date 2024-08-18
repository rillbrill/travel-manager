import { UserType } from 'src/auth/model/auth.types';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  socialId: string;

  @Column({
    type: 'enum',
    enum: UserType,
  })
  type: UserType;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  nickname: string;

  @Column({ nullable: true })
  profileImage: string;

  @Column({ nullable: true })
  refreshToken: string;
}
