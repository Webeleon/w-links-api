import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UsersEntity } from '../users/users.entity';

@Entity()
export class ThemeEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @OneToOne(() => UsersEntity)
  @JoinColumn()
  owner: UsersEntity;

  @Column({
    default: '#1C2F40',
  })
  backgroundColor: string;

  @Column({
    default: '#82d7c4',
  })
  linkBackgroundColor: string;

  @Column({
    default: '#c482bf',
  })
  linkBorderColor: string;

  @Column({
    default: '#1C2F40',
  })
  linkTextColor: string;
}
