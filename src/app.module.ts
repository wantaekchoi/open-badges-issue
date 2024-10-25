import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@nestjs/config';
import { BadgesModule } from './badges';
import { DatabaseModule } from './infra';

@Module({
  imports: [ConfigModule, DatabaseModule, CqrsModule, BadgesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
