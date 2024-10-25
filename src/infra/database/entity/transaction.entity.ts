import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('transaction')
export class TransactionEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  id: string;

  @Column({ name: 'chain' })
  chainId: string;

  @Column({ name: 'tx' })
  transactionId: string;

  @Column({ name: 'value' })
  value: number;

  @Column({ name: 'data' })
  data: string;
}
