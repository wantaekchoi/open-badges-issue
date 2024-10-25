export class DataFetchException extends Error {
  private static readonly MESSAGE = 'Data fetch failed';
  constructor() {
    super(DataFetchException.MESSAGE);
  }
  static throw(): never {
    throw new DataFetchException();
  }
}
