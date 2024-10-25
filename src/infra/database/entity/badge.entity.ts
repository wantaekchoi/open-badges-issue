import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { TagEntity } from './tag.entity';
import { ProfileEntity } from './profile.entity';

@Entity('badge')
export class BadgeEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  id: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'description' })
  description: string;

  @Column({ name: 'image' })
  image: string;

  @Column({ name: 'narrative' })
  narrative: string;

  @ManyToOne(() => ProfileEntity, { eager: true })
  @JoinColumn({ name: 'issuer' })
  issuer: ProfileEntity;

  @OneToMany(() => TagEntity, (tag) => tag.badge, { eager: true })
  tags: TagEntity[];
}
