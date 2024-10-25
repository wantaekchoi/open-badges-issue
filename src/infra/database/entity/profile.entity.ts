import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { ImageEntity } from './image.entity';
import { PublicKeyEntity } from './public-key.entity';

@Entity('profile')
export class ProfileEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  id: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'url' })
  url: string;

  @Column({ name: 'description' })
  description: string;

  @OneToOne(() => ImageEntity, { eager: true })
  @JoinColumn({ name: 'image' })
  image: ImageEntity;

  @Column({ name: 'email' })
  email: string;

  @OneToMany(() => PublicKeyEntity, (publicKey) => publicKey.owner)
  publicKey: PublicKeyEntity;
}
