import { Badge } from 'src/badges';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { PublicKeyEntity } from './public-key.entity';
import { Crypto } from 'src/util';

@Entity('recipient')
export class RecipientEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  id: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'description' })
  email: string;

  @Column({ name: 'narrative' })
  salt: string;

  @OneToMany(() => PublicKeyEntity, (publicKey) => publicKey.owner)
  publicKey: PublicKeyEntity;

  get hash(): string {
    return `sha256$${Crypto.sha256(this.email, this.salt).toString('hex')}`;
  }
}
