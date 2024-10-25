import { SavePort } from 'src/common';
import { Recipient } from 'src/badges';

export const SaveRecipientPortSymbol = Symbol('SaveRecipientPort');

export interface SaveRecipientPort extends SavePort<Recipient> {}
