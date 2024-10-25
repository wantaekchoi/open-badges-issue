import { SavePort } from 'src/common';
import { Assertion } from 'src/badges';

export const SaveAssertionPortSymbol = Symbol('SaveAssertionPort');

export interface SaveAssertionPort extends SavePort<Assertion> {}
