export class NotDefinedException extends Error {
  private static readonly MESSAGE = 'Not defined';
  constructor(value?: string) {
    const message = value
      ? `${NotDefinedException.MESSAGE} ${value}`
      : NotDefinedException.MESSAGE;
    super(message);
  }
  static throw(value?: string): never {
    throw new NotDefinedException(value);
  }
}
