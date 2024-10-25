import { Web3Port } from 'src/badges/application';
import { BlockchainException } from 'src/exception';
import Web3, { Transaction, TransactionReceipt } from 'web3';

export class Web3Provider implements Web3Port {
  private readonly web3: Web3;
  private readonly address: string;

  constructor(endpoint: string, privateKey: string) {
    this.web3 = new Web3(endpoint);
    const account = this.web3.eth.accounts.privateKeyToAccount(privateKey);
    this.address = account.address;
    this.web3.eth.accounts.wallet.add(account);
  }

  async getChainId(): Promise<number> {
    return Number(await this.web3.eth.getChainId());
  }

  async send(params: {
    to: string;
    value: number;
    data?: string;
    urgency?: 'low' | 'medium' | 'high';
  }): Promise<TransactionReceipt> {
    try {
      const transaction: Transaction = {
        from: this.address,
        to: params.to,
        value: params.value,
        data: params.data,
      };
      const estimatedGas = await this.estimateGas(transaction);
      return await this.web3.eth.sendTransaction({
        ...transaction,
        gas: estimatedGas,
      });
    } catch (error) {
      BlockchainException.throw();
    }
  }

  getAddress(): string {
    return this.address;
  }

  getBurnAdress(): string {
    return '0xdeaDDeADDEaDdeaDdEAddEADDEAdDeadDEADDEaD';
  }

  private async estimateGas(transaction: Transaction): Promise<bigint> {
    try {
      return await this.web3.eth.estimateGas(transaction);
    } catch (error) {
      return BigInt(transaction.data ? 100000 : 21000);
    }
  }
}
