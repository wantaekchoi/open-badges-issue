import { ApiProperty } from '@nestjs/swagger';

export class IssueDto {
  @ApiProperty({ type: 'array', items: { type: 'string', format: 'number' } })
  readonly recipientIds: string[];
}
