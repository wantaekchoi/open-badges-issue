import { UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
  @UpdateDateColumn({ name: 'reg_dttm', comment: 'created at timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'mod_dttm', comment: 'updated at timestamp' })
  updatedAt: Date;
}
