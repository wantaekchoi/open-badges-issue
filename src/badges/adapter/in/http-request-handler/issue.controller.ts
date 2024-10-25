import { Body, Controller, Inject, Param, Post } from '@nestjs/common';
import { IssueCommand } from 'src/badges/application';
import { EventEmitter, EventEmitterSymbol } from 'src/common';
import { IssueDto } from './dto';
import { Trace } from 'src/infra';

@Controller()
export class IssueController {
  constructor(
    @Inject(EventEmitterSymbol) private readonly eventEmitter: EventEmitter,
  ) {}

  @Post('badges/:id/issue')
  @Trace()
  issueRequestHandler(@Param('id') id: string, @Body() issueDto: IssueDto) {
    this.eventEmitter.emit(
      'badges.issue',
      IssueCommand.from(id, issueDto.recipientIds),
    );
  }
}
