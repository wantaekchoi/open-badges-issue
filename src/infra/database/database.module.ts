import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmLoggerProvider } from './provider/typeorm-logger.provider';
import { TransactionProxySymbol } from 'src/proxy';
import { TypeOrmTransactionProxy } from './proxy/transaction.proxy';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'order.db',
      autoLoadEntities: true,
      synchronize: true,
      logging: 'all',
      logger: new TypeOrmLoggerProvider(),
    }),
  ],
  providers: [
    {
      provide: TransactionProxySymbol,
      useClass: TypeOrmTransactionProxy,
    },
  ],
  exports: [TransactionProxySymbol],
})
export class DatabaseModule extends TypeOrmModule {}
