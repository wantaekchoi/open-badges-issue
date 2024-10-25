import { Module } from '@nestjs/common';
import {
  AssertionRepository,
  BadgeRepository,
  IssueCommandHandler,
  IssueController,
  RecipientRepository,
  Web3Provider,
} from './adapter';
import { EventEmitterSymbol } from 'src/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  IssueService,
  IssueUsecaseSymbol,
  LoadBadgePortSymbol,
  LoadRecipientPortSymbol,
  SaveAssertionPortSymbol,
  SaveIssuePortSymbol,
  SaveRecipientPortSymbol,
  Web3PortSymbol,
} from './application';
import { TransactionProxySymbol } from 'src/proxy';
import { DatabaseModule } from 'src/infra';

const RecipientRepositorySymbol = symbol('RecipientRepository');
@Module({
  imports: [DatabaseModule],
  controllers: [IssueController],
  providers: [
    { provide: EventEmitterSymbol, useClass: EventEmitter2 },
    {
      provide: IssueUsecaseSymbol,
      useClass: IssueService,
    },
    { provide: RecipientRepositorySymbol, useClass: RecipientRepository },
    { provide: LoadBadgePortSymbol, useClass: BadgeRepository },
    { provide: LoadRecipientPortSymbol, useExisting: RecipientRepository },
    { provide: SaveRecipientPortSymbol, useExisting: RecipientRepository },
    { provide: Web3PortSymbol, useClass: Web3Provider },
    { provide: SaveIssuePortSymbol, useClass: IssueRe },
    { provide: SaveAssertionPortSymbol, useClass: AssertionRepository },
    IssueCommandHandler,
  ],
})
export class BadgesModule {}
