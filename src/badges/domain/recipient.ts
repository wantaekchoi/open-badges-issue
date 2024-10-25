import { NoArgsConstructor } from 'src/exception';
import crypto from 'crypto';
import { IdentityObject, RecipientProfile } from './assertion-types';
import { Assertion } from './assertion';

export class Recipient {
  private assertion: Assertion;

  private constructor(
    private readonly publicKey: string,
    private readonly name: string,
    private readonly email: string,
    private readonly salt: string,
    private readonly hash: string,
    private readonly id?: string,
  ) {}

  setAssertion(assertion: Assertion): this {
    this.assertion = assertion;
    return this;
  }

  toIdentityObject(option?: { hashed?: boolean }): IdentityObject {
    const hashed = Boolean(option?.hashed);
    return {
      type: 'email',
      hashed,
      ...(hashed
        ? { identity: this.hash, salt: this.salt }
        : { identity: this.email }),
    };
  }

  toRecipientProfile(): RecipientProfile {
    return {
      type: ['RecipientProfile', 'Extension'],
      publicKey: this.publicKey,
      name: this.name,
    };
  }

  static withId(
    id: string,
    publicKey: string,
    name: string,
    email: string,
    salt: string,
    hash: string,
  ): Recipient {
    return new Recipient(publicKey, name, email, salt, hash, id);
  }

  static withoutId(
    publicKey: string,
    name: string,
    email: string,
    salt: string,
    hash: string,
  ): Recipient {
    return new Recipient(publicKey, name, email, salt, hash);
  }

  static builder(): Builder {
    return new Builder();
  }
}

class Builder {
  private _id: string;
  private _publicKey: string;
  private _name: string;
  private _email: string;
  private _salt: string;
  private _hash: string;

  id(id: string): this {
    this._id = id;
    return this;
  }

  publicKey(publicKey: string): this {
    this._publicKey = publicKey;
    return this;
  }

  name(name: string): this {
    this._name = name;
    return this;
  }

  email(email: string): this {
    this._email = email;
    return this;
  }

  salt(salt: string): this {
    this._salt = salt;
    return this;
  }

  hash(hash: string): this {
    this._hash = hash;
    return this;
  }

  build(): Recipient {
    if (
      !this._publicKey ||
      !this.name ||
      !this._email ||
      Boolean(this._salt) !== Boolean(this._hash)
    ) {
      NoArgsConstructor.throw();
    }

    if (!this._salt) {
      this.salt(crypto.randomBytes(16).toString('hex'));
      this.hash(
        crypto
          .createHash('sha256')
          .update(`${this._email}${this._salt}`)
          .digest('hex'),
      );
    }

    return this._id
      ? Recipient.withId(
          this._id,
          this._publicKey,
          this._name,
          this._email,
          this._salt,
          this._hash,
        )
      : Recipient.withoutId(
          this._publicKey,
          this._name,
          this._email,
          this._salt,
          this._hash,
        );
  }
}
