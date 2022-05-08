import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UsersEntity } from '../users/users.entity';
import { LinksType } from './links-type.enum';
import { RedirectEventEntity } from './track-redirect/redirect-event.entity';

@Entity()
export class LinksEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({
    enum: LinksType,
    default: LinksType.OTHER,
    nullable: true,
  })
  type: LinksType;

  @Column()
  target: string;

  @Column({
    nullable: true,
  })
  displayName?: string;

  @Column({
    default: 0,
  })
  order: number;

  @ManyToOne(() => UsersEntity, (user) => user.links)
  owner: UsersEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(
    () => RedirectEventEntity,
    (redirectEvent) => redirectEvent.link,
    {},
  )
  events: RedirectEventEntity[];
}
