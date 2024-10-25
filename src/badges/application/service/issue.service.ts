import { Inject, Logger } from '@nestjs/common';
import {
  BlockchainException,
  DataFetchException,
  DataSyncException,
  MerkleTreeException,
} from 'src/exception';
import { TransactionProxy } from 'src/infra';
import { MerkleTreeTool } from 'src/util';
import {
  IssueCommand,
  IssueUsecase,
  LoadBadgePort,
  LoadRecipientPort,
  TransactionReceipt,
  Web3Port,
  SaveRecipientPort,
  SaveIssuePort,
  SaveAssertionPort,
  LoadBadgePortSymbol,
  LoadRecipientPortSymbol,
  Web3PortSymbol,
  SaveIssuePortSymbol,
  SaveRecipientPortSymbol,
  SaveAssertionPortSymbol,
} from '../port';
import {
  Badge,
  Recipient,
  Assertion,
  Issue,
  AssertionSignature,
} from '../../domain';
import { TransactionProxySymbol } from 'src/proxy';

export class IssueService implements IssueUsecase {
  constructor(
    private readonly logger: Logger,
    @Inject(TransactionProxySymbol)
    private readonly transactionProxy: TransactionProxy,
    @Inject(LoadBadgePortSymbol)
    private readonly loadBadgePort: LoadBadgePort,
    @Inject(LoadRecipientPortSymbol)
    private readonly loadRecipientPort: LoadRecipientPort,
    @Inject(Web3PortSymbol)
    private readonly web3Port: Web3Port,
    @Inject(SaveIssuePortSymbol)
    private readonly saveIssuePort: SaveIssuePort,
    @Inject(SaveRecipientPortSymbol)
    private readonly saveRecipientPort: SaveRecipientPort,
    @Inject(SaveAssertionPortSymbol)
    private readonly saveAssertionPort: SaveAssertionPort,
  ) {}

  async issue(command: IssueCommand): Promise<Issue> {
    return await this.transactionProxy.execute(() => this.issueBadge(command));
  }

  async issueBadge({ badgeid, recipientIds }: IssueCommand): Promise<Issue> {
    try {
      /** 배지 클래스 조회 */
      const badge: Badge = await this.loadBadgeById(badgeid);

      /** 수령인 조회 */
      const recipients: Recipient[] =
        await this.loadRecipientsByIds(recipientIds);

      /** 머클루드 생성 */
      const issuedOn = new Date();
      const publicKey = this.getPublicKey();
      const issue = await this.saveIssue(
        Issue.withoutId(badge, publicKey, issuedOn),
      );
      const assertions: Assertion[] = recipients.map((recipient) =>
        Assertion.withoutId(badge, recipient, issue),
      );
      const normalizedAssertions = await Promise.all(
        assertions.map(async (assertion) => await assertion.normalize()),
      );
      const merkleTree = this.createMerkleTree(normalizedAssertions);
      const merkleRoot = merkleTree.getRoot();

      /** 블록체인 트랜잭션 전송 */
      const receipt = await this.transact(merkleRoot);

      /** 수령인 업데이트 */
      await this.saveRecipients(
        assertions.map(
          (assertion: Assertion): Recipient =>
            assertion.getRecipient().setAssertion(assertion),
        ),
      );

      /** 발행 값 생성 */
      const transationId = receipt.transactionHash.toString();
      const chainId = await this.web3Port.getChainId();

      /** 배지 저장 */
      const anchors = [issue.getAnchor()];
      await this.saveAssertions(
        assertions.map((assertion: Assertion, index: number): Assertion => {
          const targetHash = merkleTree.getLeaf(index);
          const proof = merkleTree.getProof(index);
          const signature: AssertionSignature = {
            publicKey,
            merkleRoot,
            targetHash,
            proof,
            anchors,
          };
          return assertion.setSignature(signature);
        }),
      );

      return await this.saveIssue(
        issue.setTransactionId(transationId).setChainId(chainId),
      );
    } catch (error) {
      if (error instanceof DataFetchException) {
        throw error;
      }
      throw error;
    }
  }

  private async loadBadgeById(id: string): Promise<Badge> {
    try {
      return this.loadBadgePort.loadOneByIdOrFail(id);
    } catch (error) {
      this.logError('failed to load badge by id', error);
      DataFetchException.throw();
    }
  }

  private async loadRecipientsByIds(id: string[]): Promise<Recipient[]> {
    try {
      return this.loadRecipientPort.loadAllByIds(id);
    } catch (error) {
      this.logError('failed to load recipients by ids', error);
      DataFetchException.throw();
    }
  }

  private async saveIssue(issue: Issue): Promise<Issue> {
    try {
      return this.saveIssuePort.save(issue);
    } catch (error) {
      this.logError('failed to save issue entity', error);
      DataSyncException.throw();
    }
  }

  private async saveRecipients(recipients: Recipient[]): Promise<Recipient[]> {
    try {
      return this.saveRecipientPort.saveAll(recipients);
    } catch (error) {
      this.logError('failed to save recipients entity', error);
      DataSyncException.throw();
    }
  }

  private async saveAssertions(assertions: Assertion[]): Promise<Assertion[]> {
    try {
      return this.saveAssertionPort.saveAll(assertions);
    } catch (error) {
      this.logError('failed to save assertions entity', error);
      DataSyncException.throw();
    }
  }

  private async transact(merkleRoot: string): Promise<TransactionReceipt> {
    try {
      const to = this.web3Port.getBurnAdress();
      return this.web3Port.send({ to, value: 0, data: merkleRoot });
    } catch (error) {
      this.logError('failed to blockchain transact', error);
      BlockchainException.throw();
    }
  }

  private createMerkleTree(normalizedAssertions: string[]): MerkleTreeTool {
    try {
      return MerkleTreeTool.from(normalizedAssertions);
    } catch (error) {
      this.logError('failed to create merkle tree', error);
      MerkleTreeException.throw();
    }
  }

  private getPublicKey(): string {
    try {
      return this.web3Port.getAddress();
    } catch (error) {
      this.logError('failed to load blockchain public key', error);
      DataFetchException.throw();
    }
  }

  private logError(message: string, error: unknown) {
    if (error instanceof Error) {
      this.logger.error(`${message} ${error}`, error.stack, error);
    } else {
      this.logger.error(message, error);
    }
  }
}
