export class IssueCommand {
  private constructor(
    public readonly badgeid: string,
    public readonly recipientIds: string[],
  ) {}

  static from(badgeid: string, recipientIds: string[]): IssueCommand {
    return new IssueCommand(badgeid, recipientIds);
  }
}
