import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { LinksEntity } from '../links/links.entity';
import { Exclude } from 'class-transformer';
import { ThemeEntity } from '../themes/theme.entity';

@Entity()
export class UsersEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Exclude()
  @Column({
    nullable: true,
  })
  googleId?: string;

  @Column({
    unique: true,
  })
  username: string;

  @Exclude()
  @Column({
    nullable: true,
  })
  passwordHash?: string;

  @Column({
    nullable: true,
    unique: true,
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
