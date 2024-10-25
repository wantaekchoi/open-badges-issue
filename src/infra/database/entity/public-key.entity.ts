import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { ProfileEntity } from './profile.entity';

@Entity('pem')
export class PublicKeyEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  id: string;

  @ManyToOne(() => ProfileEntity, (issuer) => issuer.publicKey)
  @JoinColumn({ name: 'owner' })
  owner: ProfileEntity;

  @Column({ name: 'pem' })
  publicKey: string;
}
