import { SavePort } from 'src/common';
import { Issue } from 'src/badges';

export const SaveIssuePortSymbol = Symbol('SaveIssuePort');

export interface SaveIssuePort extends SavePort<Issue> {}
