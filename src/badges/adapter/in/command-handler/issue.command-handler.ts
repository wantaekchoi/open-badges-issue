import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IssueCommand } from 'src/badges/application';
import {
  IssueUsecase,
  IssueUsecaseSymbol,
} from 'src/badges/application/port/in/usecase/issue.usecase';
import { Issue } from 'src/badges/domain';
import { Trace } from 'src/infra';

@CommandHandler(IssueCommand)
export class IssueCommandHandler
  implements ICommandHandler<IssueCommand, Issue>
{
  constructor(
    @Inject(IssueUsecaseSymbol) private readonly issueUsecase: IssueUsecase,
  ) {}

  @Trace()
  async execute(command: IssueCommand): Promise<Issue> {
    return await this.issueUsecase.issue(command);
  }
}
