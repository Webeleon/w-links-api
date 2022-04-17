import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { LinksEntity } from '../links/links.entity';

@Entity()
export class UsersEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({
    unique: true,
  })
  username: string;

  @Column()
  passwordHash: string;

  @Column({
    nullable: true,
  })
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    default: false,
  })
  active: boolean;

  @OneToMany(() => LinksEntity, (link) => link.owner)
  links: LinksEntity[];
}
