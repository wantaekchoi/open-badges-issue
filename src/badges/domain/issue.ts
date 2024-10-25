import { Badge } from './badge';
import { Anchor } from './assertion-types';
import { NotDefinedException } from 'src/exception/not-defined.exception';
import { Network, Status } from 'src/constant';
import { InvalidParameterException } from 'src/exception';
export class Issue {
  private static readonly IssueStatus = {
    Created: Status.Created,
    Done: Status.Done,
    Fail: Status.Fail,
  };

  private static readonly networks: { [key: number]: Network } = {
    1: Network.Ethmain,
    3: Network.Ethropst,
    4: Network.Ethrinkeby,
    5: Network.Ethgoerli,
    11155111: Network.Ethsepolia,
  };

  private constructor(
    private readonly badge: Badge,
    private readonly publicKey: string,
    private readonly issuedOn: Date,
    private status: Status,
    private chainId?: number,
    private transactionId?: string,
    private id?: string,
  ) {}

  getIssuedOn(): Date {
    return this.issuedOn;
  }

  getPublicKey(): string {
    if (!this.publicKey) {
      NotDefinedException.throw('publicKey');
    }
    return this.publicKey;
  }

  getAnchor(): Anchor {
    if (!this.chainId || !this.transactionId) {
      NotDefinedException.throw();
    }
    const chain: Network = Issue.networks[this.chainId];
    if (!chain) {
      InvalidParameterException.throw();
    }
    return {
      sourceId: this.transactionId,
      type: 'ETHData',
      chain,
    };
  }

  setChainId(chainId: number): this {
    this.chainId = chainId;
    return this;
  }

  setTransactionId(transactionId: string): this {
    this.transactionId = transactionId;
    return this;
  }

  setId(id: string): this {
    this.id = id;
    return this;
  }

  static withoutId(
    badge: Badge,
    publicKey: string,
    issuedOn: Date,
    status: Status = Issue.IssueStatus.Created,
    chainId?: number,
    transactionId?: string,
  ) {
    return new Issue(
      badge,
      publicKey,
      issuedOn,
      status,
      chainId,
      transactionId,
    );
  }

  static withId(
    id: string,
    badge: Badge,
    publicKey: string,
    issuedOn: Date,
    status: Status = Issue.IssueStatus.Created,
    chainId?: number,
    transactionId?: string,
  ) {
    return new Issue(
      badge,
      publicKey,
      issuedOn,
      status,
      chainId,
      transactionId,
      id,
    );
  }
}
