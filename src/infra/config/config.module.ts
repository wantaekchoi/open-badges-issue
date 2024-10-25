import { ConfigModule as NestjsConfigModule } from '@nestjs/config';
import { web3Config } from './web3.config';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    NestjsConfigModule.forRoot({
      isGlobal: true,
      load: [web3Config],
    }),
  ],
})
export class ConfigModule {}
