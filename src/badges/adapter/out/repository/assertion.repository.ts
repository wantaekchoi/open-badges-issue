import { Assertion } from 'src/badges';
import { SaveAssertionPort } from 'src/badges/application';

export class AssertionRepository implements SaveAssertionPort {
  save(entity: Assertion): Promise<Assertion> {
    throw new Error('Method not implemented.');
  }

  saveAll(entities: Assertion[]): Promise<Assertion[]> {
    throw new Error('Method not implemented.');
  }
}
