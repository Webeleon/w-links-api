import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UsersEntity } from '../users/users.entity';

@Entity()
export class LinksEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  target: string;

  @Column({
    nullable: true,
  })
  displayName?: string;

  @ManyToOne(() => UsersEntity, (user) => user.links)
  owner: UsersEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
