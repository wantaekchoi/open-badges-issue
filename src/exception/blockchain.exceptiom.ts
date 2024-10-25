export class BlockchainException extends Error {
  private static readonly MESSAGE = 'Blockchain exception';
  constructor() {
    super(BlockchainException.MESSAGE);
  }
  static throw(): never {
    throw new BlockchainException();
  }
}
