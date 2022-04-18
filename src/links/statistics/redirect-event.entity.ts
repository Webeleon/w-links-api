import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LinksEntity } from '../links.entity';

@Entity()
export class RedirectEventEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ManyToOne(() => LinksEntity, {
    eager: true,
  })
  link: LinksEntity;

  @Column({
    nullable: true,
  })
  ip?: string;

  @Column({
    nullable: true,
  })
  ips?: string;

  @Column({
    nullable: true,
  })
  userAgent?: string;

  @Column({
    nullable: true,
  })
  acceptLanguage?: string;

  @CreateDateColumn()
  createdAt: Date;
}
