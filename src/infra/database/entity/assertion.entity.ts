import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { RecipientEntity } from './recipient.entity';
import { IssueEntity } from './issue.entity';

type Proof = { left: string } | { right: string };

@Entity('assertion')
export class AssertionEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  id: string;

  @OneToOne(() => RecipientEntity, { eager: true })
  @JoinColumn({ name: 'recipient' })
  recipient: RecipientEntity;

  @ManyToOne(() => IssueEntity, { eager: true })
  issue: IssueEntity;

  @Column({ name: 'hash' })
  hash: string;

  @Column({ name: 'proof' })
  private _proof: string;

  get proof(): Proof[] {
    return JSON.parse(this._proof ?? []);
  }

  set proof(proof: Proof[]) {
    this._proof = JSON.stringify(proof);
  }
}
