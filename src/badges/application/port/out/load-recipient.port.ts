import { Recipient } from 'src/badges';

export const LoadRecipientPortSymbol = Symbol('LoadRecipientPort');

export interface LoadRecipientPort {
  loadAllByIds(ids: string[]): Promise<Recipient[]>;
}
