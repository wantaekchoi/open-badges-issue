import MerkleTree from 'merkle-tools';
import { InvalidParameterException, NotDefinedException } from 'src/exception';

export class MerkleTreeTool {
  private constructor(private readonly merkleTree: MerkleTree) {}

  addLeaf(leaf: string, doHash = true) {
    this.merkleTree.addLeaf(leaf, doHash);
  }

  addLeaves(leaves: string[], doHash = true) {
    this.merkleTree.addLeaves(leaves, doHash);
  }

  getLeaf(index: number): string {
    const leaf = this.merkleTree.getLeaf(index);
    if (!leaf) {
      InvalidParameterException.throw();
    }
    return leaf.toString();
  }

  getProof(index: number): ({ left: string } | { right: string })[] {
    const proof = this.merkleTree.getProof(index);
    if (!proof) {
      InvalidParameterException.throw();
    }
    return proof;
  }

  getRoot(): string {
    const merkleRoot = this.merkleTree.getMerkleRoot();
    if (!merkleRoot) {
      NotDefinedException.throw('merkleRoot');
    }
    return merkleRoot.toString();
  }

  static from(normalizedDocuments: string[]): MerkleTreeTool {
    const merkleProofGenerator = new MerkleTreeTool(
      new MerkleTree({ hashType: 'sha256' }),
    );
    merkleProofGenerator.addLeaves(normalizedDocuments);
    return merkleProofGenerator;
  }
}
