import { Badge, Issue, Recipient } from '.';
import { NotDefinedException } from 'src/exception/not-defined.exception';
import {
  Anchor,
  BlockcertsAssertion,
  OpenBadgesAssertion,
  Proof,
} from './assertion-types';
import { JsonLdNormalizer } from 'src/util';

export interface Signature {
  publicKey: string;
  merkleRoot: string;
  targetHash: string;
  proof: Proof[];
  anchors: Anchor[];
}

export class Assertion {
  private signature: Signature;

  private constructor(
    private readonly badge: Badge,
    private readonly recipient: Recipient,
    private readonly issue: Issue,
    private readonly id?: string,
  ) {}

  setSignature(signature: Signature): this {
    this.signature = signature;
    return this;
  }

  getRecipient(): Recipient {
    return this.recipient;
  }

  toOpenBadgesAssertion(): OpenBadgesAssertion {
    if (!this.id) {
      NotDefinedException.throw('id');
    }
    return {
      '@context': ['https://w3id.org/openbadges/v2'],
      type: ['Assertion'],
      id: this.id,
      issuedOn: this.issue.getIssuedOn().toISOString(),
      verification: {
        type: ['HostedBadge'],
      },
      badge: this.badge.toBadgeClass(),
      recipient: this.recipient.toIdentityObject({ hashed: true }),
    };
  }

  toBlockCertsAssertion(): BlockcertsAssertion {
    if (!this.id) {
      NotDefinedException.throw('id');
    }
    return {
      '@context': [
        'https://w3id.org/openbadges/v2',
        'https://w3id.org/blockcerts/v2',
      ],
      type: ['Assertion', 'BlockcertsCredential'],
      id: this.id,
      issuedOn: this.issue.getIssuedOn().toISOString(),
      verification: {
        type: ['HostedBadge', 'MerkleProofVerification2017', 'Extension'],
        publicKey: this.signature.publicKey,
      },
      signature: {
        type: ['MerkleProof2017', 'Extension'],
        proof: this.signature.proof,
        targetHash: this.signature.targetHash,
        merkleRoot: this.signature.merkleRoot,
        anchors: this.signature.anchors,
      },
      badge: this.badge.toBadgeClass(),
      recipient: this.recipient.toIdentityObject({ hashed: true }),
      recipientProfile: this.recipient.toRecipientProfile(),
    };
  }

  async normalize(): Promise<string> {
    if (!this.id || !this.issue) {
      NotDefinedException.throw();
    }

    const document = {
      '@context': [
        'https://w3id.org/openbadges/v2',
        'https://w3id.org/blockcerts/v2',
      ],
      type: ['Assertion', 'BlockcertsCredential'],
      id: this.id,
      issuedOn: this.issue.getIssuedOn().toISOString(),
      verification: {
        type: ['HostedBadge', 'MerkleProofVerification2017', 'Extension'],
        publicKey: this.issue.getPublicKey(),
      },
      badge: this.badge.toBadgeClass(),
      recipient: this.recipient.toIdentityObject({ hashed: true }),
      recipientProfile: this.recipient.toRecipientProfile(),
    };

    return await JsonLdNormalizer.normalize(document);
  }

  static withId(
    id: string,
    badge: Badge,
    recipient: Recipient,
    issue: Issue,
  ): Assertion {
    return new Assertion(badge, recipient, issue, id);
  }

  static withoutId(
    badge: Badge,
    recipient: Recipient,
    issue: Issue,
  ): Assertion {
    return new Assertion(badge, recipient, issue);
  }
}
