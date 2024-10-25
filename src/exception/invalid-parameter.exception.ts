export class InvalidParameterException extends Error {
  private static readonly MESSAGE = 'Invalid parameter';
  constructor() {
    super(InvalidParameterException.MESSAGE);
  }
  static throw(): never {
    throw new InvalidParameterException();
  }
}
