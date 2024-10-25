import { Injectable } from '@nestjs/common';
import { TransactionProxy } from 'src/proxy';
import { DataSource } from 'typeorm';

@Injectable()
export class TypeOrmTransactionProxy implements TransactionProxy {
  constructor(private readonly dataSource: DataSource) {}

  async execute<T>(operation: () => Promise<T>): Promise<T> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const result = await operation();
      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
