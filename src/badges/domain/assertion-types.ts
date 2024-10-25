export interface OpenBadgesAssertion {
  '@context': string[];
  type: string[];
  id: string;
  issuedOn: string;
  recipient: IdentityObject;
  badge: BadgeClass;
  verification: Verification;
}

export interface BlockcertsAssertion {
  '@context': string[];
  type: string[];
  id: string;
  issuedOn: string;
  recipient: IdentityObject;
  recipientProfile: RecipientProfile;
  badge: BadgeClass;
  verification: Verification;
  signature: Signature;
}

export interface IdentityObject {
  type: string;
  identity: string;
  hashed: boolean;
  salt?: string;
}

export interface BadgeClass {
  id: string;
  type: string;
  name: string;
  image: string;
  description: string;
  criteria?: {
    narrative: string;
  };
  tags?: string[];
  issuer: Profile;
}

export interface Profile {
  id: string;
  type: string;
  name: string;
  url: string;
  description: string;
  image: string;
  email: string;
  revocationList: string;
}

export interface RecipientProfile {
  type: string[];
  name: string;
  publicKey: string;
}

interface Verification {
  type: string[];
  publicKey?: string;
}

export interface Anchor {
  sourceId: string;
  type: string;
  chain: string;
}

interface Signature {
  type: string[];
  targetHash: string;
  merkleRoot: string;
  anchors: Anchor[];
  proof: Proof[];
}

export interface Proof {
  left?: string;
  right?: string;
}
