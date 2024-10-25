import { Issue } from 'src/badges';
import { IssueCommand } from './command';

export const IssueUsecaseSymbol = Symbol('IssueUsecase');

export interface IssueUsecase {
  issue(command: IssueCommand): Promise<Issue>;
}
