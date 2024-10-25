export class MerkleTreeException extends Error {
  private static readonly MESSAGE = 'Merkle tree exception';
  constructor() {
    super(MerkleTreeException.MESSAGE);
  }
  static throw(): never {
    throw new MerkleTreeException();
  }
}
