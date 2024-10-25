import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { BadgeEntity } from './badge.entity';

@Entity('tag')
export class TagEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  id: string;

  @Column({ name: 'name', comment: 'tag name' })
  name: string;

  @ManyToOne(() => BadgeEntity, (badge) => badge.tags, { eager: true })
  @JoinColumn({ name: 'badge' })
  badge: BadgeEntity;
}
