export class DataSyncException extends Error {
  private static readonly MESSAGE = 'Data sync failed';
  constructor() {
    super(DataSyncException.MESSAGE);
  }
  static throw(): never {
    throw new DataSyncException();
  }
}
