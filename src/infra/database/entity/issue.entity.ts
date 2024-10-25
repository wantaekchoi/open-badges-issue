import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { BadgeEntity } from './badge.entity';
import { TransactionEntity } from './transaction.entity';

@Entity('profile')
export class IssueEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  id: string;

  @ManyToOne(() => BadgeEntity, { eager: true })
  @JoinColumn({ name: 'badge' })
  badge: BadgeEntity;

  @Column({ name: 'issuedOn' })
  issuedOn: Date;

  @Column({ name: 'status' })
  status: string;

  @OneToOne(() => TransactionEntity, { eager: true })
  @JoinColumn({ name: 'anchor' })
  anchor: TransactionEntity;
}
