import * as crypto from 'crypto';

describe('crypto.ts', () => {
  test('Salt 테스트: 원본값+salt를 해시한 것과 hash 버퍼에 원본값 넣고 salt값 넣고 해시한 것이 같은지 테스트', () => {
    const plain = crypto.randomBytes(32).toString();
    const salt = crypto.randomBytes(32).toString();
    const concatenatedHash = crypto
      .createHash('sha256')
      .update(plain + salt)
      .digest('hex');
    const chainedHash = crypto
      .createHash('sha256')
      .update(plain)
      .update(salt)
      .digest('hex');
    expect(concatenatedHash).toBe(chainedHash);
  });
});
