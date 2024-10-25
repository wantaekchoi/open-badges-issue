import { Badge } from 'src/badges';

export const LoadBadgePortSymbol = Symbol('LoadBadgePort');

export interface LoadBadgePort {
  loadOneByIdOrFail(id: string): Promise<Badge>;
}
