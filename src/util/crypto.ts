import crypto from 'crypto';
import { BinaryLike, Hash } from 'crypto';

export class Crypto {
  static sha256(data: BinaryLike, salt?: BinaryLike): Buffer {
    const hash: Hash = crypto.createHash('sha256').update(data);
    return salt ? hash.update(salt).digest() : hash.digest();
  }
}
