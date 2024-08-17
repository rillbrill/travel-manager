import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  kakaoId: string;

  @Column()
  nickname: string;

  @Column({ nullable: true })
  profileImage: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  refreshToken: string;
}
